import { Resend } from "resend";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const {
      assignee,
      email,
      reportRef,
      reportTitle,
      dueDate,
      location,
    } = body;

    if (!email) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email address is required.",
      });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: "RESEND_API_KEY is missing.",
      });
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: "CAPSL HSE <onboarding@resend.dev>",
      to: [email],
      subject: `New HSE Assignment • ${reportRef}`,
      html: assignmentTemplate({
        assignee,
        reportRef,
        reportTitle,
        dueDate,
        location,
      }),
    });

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: error.message,
      });
    }

    return {
      success: true,
      id: data?.id,
    };
  } catch (err: any) {
    console.error(err);

    return {
      success: false,
      message:
        err.statusMessage ??
        err.message ??
        "Unable to send email.",
    };
  }
});

function assignmentTemplate({
  assignee,
  reportRef,
  reportTitle,
  dueDate,
  location,
}: {
  assignee: string;
  reportRef: string;
  reportTitle: string;
  dueDate?: string;
  location?: string;
}) {
  return `
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<style>

body{
background:#F4F6F8;
font-family:Arial,Helvetica,sans-serif;
margin:0;
padding:30px;
}

.card{

max-width:700px;
margin:auto;
background:#fff;
border-radius:12px;
overflow:hidden;
box-shadow:0 6px 25px rgba(0,0,0,.08);

}

.header{

background:#0B6E4F;
padding:28px;
color:white;

}

.content{

padding:35px;

}

table{

width:100%;
border-collapse:collapse;
margin-top:20px;

}

td{

padding:12px;
border-bottom:1px solid #ececec;

}

.footer{

background:#fafafa;
padding:20px;
font-size:12px;
text-align:center;
color:#777;

}

.button{

display:inline-block;
padding:14px 24px;
background:#0B6E4F;
color:white !important;
text-decoration:none;
border-radius:8px;
font-weight:bold;
margin-top:25px;

}

</style>

</head>

<body>

<div class="card">

<div class="header">

<h2>CAPSL HSE Assignment</h2>

</div>

<div class="content">

<p>Hello <strong>${assignee}</strong>,</p>

<p>

A Health, Safety & Environment report has been assigned to you.

</p>

<table>

<tr>

<td><strong>Reference</strong></td>

<td>${reportRef}</td>

</tr>

<tr>

<td><strong>Title</strong></td>

<td>${reportTitle}</td>

</tr>

<tr>

<td><strong>Location</strong></td>

<td>${location ?? "-"}</td>

</tr>

<tr>

<td><strong>Due Date</strong></td>

<td>${dueDate || "-"}</td>

</tr>

</table>

<p>

Please log into the CAPSL HSE Management System to review, investigate and close out this report before the due date.

</p>

</div>

<div class="footer">

Compression & Power Systems Ltd (CAPSL)

</div>

</div>

</body>

</html>
`;
}