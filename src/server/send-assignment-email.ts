import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

type AssignmentEmail = {
  assignee: string;
  email: string;
  reportRef: string;
  reportTitle: string;
  dueDate?: string;
  location?: string;
};

export const sendAssignmentEmail = createServerFn({ method: "POST" })
  .handler(async ({ data } : {data: AssignmentEmail }) => {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured.");
    }

    const resend = new Resend(apiKey);

    const { data: result, error } = await resend.emails.send({
      from: "CAPSL HSE <onboarding@resend.dev>",
      to: [data.email],
      subject: `New HSE Assignment • ${data.reportRef}`,
      html: `<!DOCTYPE html>
<html>
  <body style="font-family:Arial,Helvetica,sans-serif;background:#f5f5f5;padding:30px;">
    <div style="max-width:620px;margin:auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,.08);">
      <div style="background:#0B6E4F;padding:25px;color:white;">
        <h2>CAPSL HSE Assignment</h2>
      </div>
      <div style="padding:30px;">
        <p>Hello <strong>${data.assignee}</strong>,</p>
        <p>A new Health, Safety & Environment report has been assigned to you.</p>
        <table style="width:100%;border-collapse:collapse;margin-top:15px;">
          <tr><td style="padding:10px;border-bottom:1px solid #eee;"><strong>Reference</strong></td><td style="padding:10px;border-bottom:1px solid #eee;">${data.reportRef}</td></tr>
          <tr><td style="padding:10px;border-bottom:1px solid #eee;"><strong>Title</strong></td><td style="padding:10px;border-bottom:1px solid #eee;">${data.reportTitle}</td></tr>
          <tr><td style="padding:10px;border-bottom:1px solid #eee;"><strong>Location</strong></td><td style="padding:10px;border-bottom:1px solid #eee;">${data.location ?? "-"}</td></tr>
          <tr><td style="padding:10px;border-bottom:1px solid #eee;"><strong>Due Date</strong></td><td style="padding:10px;border-bottom:1px solid #eee;">${data.dueDate || "-"}</td></tr>
        </table>
        <p style="margin-top:20px;">Please log into the CAPSL HSE platform to review and action this report.</p>
      </div>
      <div style="padding:20px;font-size:12px;color:#666;background:#fafafa;text-align:center;">
        CAPSL HSE Management System
      </div>
    </div>
  </body>
</html>`,
    });

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    return result;
  }); 