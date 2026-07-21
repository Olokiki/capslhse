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

export const sendAssignmentEmail = createServerFn({
  method: "POST",
})
.validator((data: AssignmentEmail) => data)
.handler(async ({ data }) => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const resend = new Resend(apiKey);

  const { data: result, error } = await resend.emails.send({
    from: "CAPSL HSE <onboarding@resend.dev>", // Change after domain verification
    to: [data.email],
    subject: `New HSE Assignment • ${data.reportRef}`,

    html: `
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">

<style>

body{
font-family:Arial,Helvetica,sans-serif;
background:#f5f5f5;
padding:30px;
}

.container{
max-width:620px;
margin:auto;
background:white;
border-radius:12px;
overflow:hidden;
box-shadow:0 4px 18px rgba(0,0,0,.08);
}

.header{
background:#0B6E4F;
padding:25px;
color:white;
}

.content{
padding:30px;
}

table{
width:100%;
border-collapse:collapse;
margin-top:15px;
}

td{
padding:10px;
border-bottom:1px solid #eee;
}

.button{
display:inline-block;
padding:12px 24px;
margin-top:24px;
background:#0B6E4F;
color:white !important;
text-decoration:none;
border-radius:8px;
font-weight:bold;
}

.footer{
padding:20px;
font-size:12px;
color:#666;
background:#fafafa;
text-align:center;
}

</style>

</head>

<body>

<div class="container">

<div class="header">

<h2>CAPSL HSE Assignment</h2>

</div>

<div class="content">

<p>Hello <strong>${data.assignee}</strong>,</p>

<p>
A new Health, Safety & Environment report has been assigned to you.
</p>

<table>

<tr>

<td><strong>Reference</strong></td>

<td>${data.reportRef}</td>

</tr>

<tr>

<td><strong>Title</strong></td>

<td>${data.reportTitle}</td>

</tr>

<tr>

<td><strong>Location</strong></td>

<td>${data.location ?? "-"}</td>

</tr>

<tr>

<td><strong>Due Date</strong></td>

<td>${data.dueDate || "-"}</td>

</tr>

</table>

<p>

Please log into the CAPSL HSE platform to review and action this report.

</p>

</div>

<div class="footer">

CAPSL HSE Management System

</div>

</div>

</body>

</html>
`,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return result;
});