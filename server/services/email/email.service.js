import { ApiError } from "../../utils/api-response.js";
import env from "../../config/env.js";

const htmlTemplate = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Your verification code</title>

<style>
  body,table,td,a{ -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
  table,td{ mso-table-rspace:0pt; mso-table-lspace:0pt; }
  img{ -ms-interpolation-mode:bicubic; display:block; border:0; outline:none; }
  body{
    margin:0; padding:0; width:100% !important;
    background-color:#0a0a0a; /* zinc-950 */
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
    color:#e5e7eb;
  }

  .wrapper{ width:100%; padding:32px 16px; box-sizing:border-box; }
  .card{
    max-width:560px; margin:0 auto;
    background:#1a1a1a; /* subtle lighter zinc */
    border-radius:14px;
    overflow:hidden;
    box-shadow:0 8px 24px rgba(0,0,0,0.35);
  }

  .header{
    padding:28px 24px 18px;
    background:#0a0a0a;
    text-align:center;
    border-bottom:1px solid #262626;
  }
  .brand{
    margin:0; font-weight:700;
    font-size:22px;
    color:#fb923c; /* orange-400 */
    letter-spacing:.5px;
  }

  .content{
    padding:30px 26px; text-align:center;
  }
  .title{
    margin:0 0 10px;
    font-size:20px; font-weight:700;
    color:#f5f5f5;
  }
  .subtitle{
    margin:0 0 24px;
    font-size:14px;
    color:#d4d4d4;
    line-height:1.6;
  }

  .code-box{
    display:inline-block;
    background:#111111;
    border:1px solid #262626;
    padding:16px 28px;
    border-radius:10px;
    margin-bottom:22px;
  }
  .code{
    margin:0;
    font-size:34px;
    font-weight:700;
    color:#fb923c; /* orange-400 */
    font-family:"Courier New",monospace;
    letter-spacing:10px;
  }

  .note{
    margin-top:6px;
    font-size:13px;
    color:#a3a3a3;
  }

  .footer{
    padding:22px 16px;
    text-align:center;
    font-size:12px;
    color:#737373;
    background:#0a0a0a;
  }

  @media(max-width:480px){
    .content{ padding:22px 18px; }
    .code{ font-size:28px; letter-spacing:8px; }
    .brand{ font-size:20px; }
  }
</style>
</head>

<body>
  <div class="wrapper">
    <table class="card" role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr><td class="header">
        <p class="brand">{{PRODUCT_NAME}}</p>
      </td></tr>

      <tr><td class="content">
        <h1 class="title">Your verification code</h1>
        <p class="subtitle">Use the code below to verify your identity.<br/>It will expire in 10 minutes.</p>

        <div class="code-box">
          <p class="code">{{CODE}}</p>
        </div>

        <p class="note">If you didn't request this, you can safely ignore this email.</p>
      </td></tr>

      <tr><td class="footer">
        &copy; ${new Date().getFullYear()} Sumeet Umbalkar. All rights reserved.
      </td></tr>
    </table>
  </div>
</body>
</html>`;

export const sendVerificationEmail = async (recipientEmail, code) => {
  const brevoApiKey = env.BREVO_API_KEY;
  if (!brevoApiKey)
    throw new ApiError(500, "Email service configuration missing.");

  const personalizedHtml = htmlTemplate
    .replace("{{CODE}}", code)
    .replace("{{PRODUCT_NAME}}", "Verification OTP");

  const payload = {
    sender: { name: "Engineeor", email: env.EMAIL_SENDER },
    to: [{ email: recipientEmail }],
    subject: `Your verification code is ${code}`,
    htmlContent: personalizedHtml,
  };

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key": brevoApiKey,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new ApiError(
      response.status,
      errorData.message || "Failed to send email",
    );
  }

  return await response.json();
};
