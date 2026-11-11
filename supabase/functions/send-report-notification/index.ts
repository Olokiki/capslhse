import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { Resend } from "npm:resend";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const resendApiKey = Deno.env.get("RESEND_API_KEY")!;
const webhookSecret = Deno.env.get("REPORT_WEBHOOK_SECRET")!;

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

const resend = new Resend(resendApiKey);

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

serve(async (req) => {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  if (!webhookSecret || req.headers.get("x-report-webhook-secret") !== webhookSecret) {
    return Response.json({ error: "Unauthorized webhook request" }, { status: 401 });
  }

  try {
    const payload = await req.json();

    if (
      payload.type !== "INSERT" ||
      payload.table !== "hse_reports" ||
      payload.schema !== "public" ||
      !payload.record?.id
    ) {
      return Response.json({ message: "Event ignored" }, { status: 200 });
    }

    const report = payload.record;

    const { data: recipients, error: recipientError } = await supabase
      .from("report_notification_recipients")
      .select("user_id")
      .eq("enabled", true);

    if (recipientError) throw recipientError;

    if (!recipients?.length) {
      return Response.json({
        success: true,
        message: "No administrators have opted in.",
        sent: 0,
      });
    }

    const userIds = recipients.map((recipient) => recipient.user_id);

    const { data: profiles, error: profileError } = await supabase
      .from("profiles")
      .select("user_id, full_name, email")
      .in("user_id", userIds);

    if (profileError) throw profileError;

    let sent = 0;
    let skipped = 0;
    let failed = 0;

    for (const recipient of profiles ?? []) {
      if (!recipient.email) {
        skipped++;
        continue;
      }

      const { data: existing, error: lookupError } = await supabase
        .from("report_notification_logs")
        .select("id, status")
        .eq("report_id", report.id)
        .eq("recipient_user_id", recipient.user_id)
        .maybeSingle();

      if (lookupError) throw lookupError;

      if (existing?.status === "sent" || existing?.status === "pending") {
        skipped++;
        continue;
      }

      let logId: string;

      if (existing) {
        const { error: updateError } = await supabase
          .from("report_notification_logs")
          .update({
            status: "pending",
            error_message: null,
          })
          .eq("id", existing.id);

        if (updateError) throw updateError;
        logId = existing.id;
      } else {
        const { data: newLog, error: insertError } = await supabase
          .from("report_notification_logs")
          .insert({
            report_id: report.id,
            recipient_user_id: recipient.user_id,
            recipient_email: recipient.email,
            status: "pending",
          })
          .select("id")
          .single();

        if (insertError) {
          if (insertError.code === "23505") {
            skipped++;
            continue;
          }
          throw insertError;
        }

        logId = newLog.id;
      }

      try {
        const emailResult = await resend.emails.send({
          from: "CAPSL HSE <hse@hse.capslgas.com>",
          to: [recipient.email],
          subject: `New HSE Report Submitted - ${report.ref}`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#222">
              <h2 style="color:#228B22">CAPSL HSE Platform</h2>
              <p>Hello ${escapeHtml(recipient.full_name)},</p>
              <p>A new HSE report has been submitted and requires attention.</p>
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px;border:1px solid #ddd"><b>Reference</b></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(report.ref)}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd"><b>Title</b></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(report.title)}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd"><b>Type</b></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(report.type)}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd"><b>Severity</b></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(report.severity)}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd"><b>Location</b></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(report.location)}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd"><b>Reported by</b></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(report.reported_by)}</td></tr>
                <tr><td style="padding:8px;border:1px solid #ddd"><b>Date</b></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(report.reported_at)}</td></tr>
              </table>
              <p>Please log in to the CAPSL HSE Platform to review this report.</p>
              <p><a href="https://hse.capslgas.com">Open CAPSL HSE Platform</a></p>
              <p>Regards,<br><b>CAPSL HSE Team</b></p>
            </div>
          `,
        });

        if (emailResult.error) {
          throw new Error(emailResult.error.message);
        }

        const { error: logUpdateError } = await supabase
          .from("report_notification_logs")
          .update({
            status: "sent",
            resend_message_id: emailResult.data?.id ?? null,
            sent_at: new Date().toISOString(),
            error_message: null,
          })
          .eq("id", logId);

        if (logUpdateError) throw logUpdateError;

        sent++;
      } catch (emailError) {
        const message =
          emailError instanceof Error ? emailError.message : String(emailError);

        await supabase
          .from("report_notification_logs")
          .update({
            status: "failed",
            error_message: message,
          })
          .eq("id", logId);

        failed++;
      }
    }

    return Response.json({
      success: true,
      report: report.ref,
      sent,
      skipped,
      failed,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    console.error("Report notification error:", message);

    return Response.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
});
