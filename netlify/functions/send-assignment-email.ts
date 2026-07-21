import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
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

  const { data, error} = await resend.emails.send({
      from: "CAPSL HSE <onboarding@resend.dev>",
      to: email,
      subject: `New HSE Assignment - ${reportRef}`,
      html: `
        <h2>CAPSL HSE Notification</h2>

        <p>Hello <strong>${assignee}</strong>,</p>

        <p>You have been assigned a new HSE Report.</p>

        <table>
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
            <td>${dueDate}</td>
          </tr>
        </table>

        <br/>

        <p>Please log in to CAPSL HSE to review and close this report.</p>

        <hr/>

        <small>
        CAPSL HSE Management System
        </small>
      `,
    });
    
    return Response.json({
      success: true,
    });

  } catch (err) {

    return Response.json({
      success: false,
      error: err,
    });
  }
};