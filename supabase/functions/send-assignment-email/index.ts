import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { Resend } from "npm:resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    const {
      assignee,
      email,
      reportRef,
      reportTitle,
      dueDate,
    } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "CAPSL HSE <onboarding@resend.dev>",
      to: [email],
      subject: `New HSE Report Assigned - ${reportRef}`,
      html: `
      <h2>CAPSL HSE</h2>

      <p>Hello <strong>${assignee}</strong>,</p>

      <p>You have been assigned a new HSE Report.</p>

      <table border="1" cellpadding="8" cellspacing="0">
          <tr>
              <td><b>Reference</b></td>
              <td>${reportRef}</td>
          </tr>

          <tr>
              <td><b>Title</b></td>
              <td>${reportTitle}</td>
          </tr>

          <tr>
              <td><b>Due Date</b></td>
              <td>${dueDate ?? "Not specified"}</td>
          </tr>
      </table>

      <br>

      <p>Please log in to the CAPSL HSE Platform to begin work.</p>

      <br>

      <p>Regards,</p>

      <strong>CAPSL HSE Team</strong>
      `,
    });

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );

  } catch (err) {

    return new Response(
      JSON.stringify({
        success: false,
        error: err.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }
});