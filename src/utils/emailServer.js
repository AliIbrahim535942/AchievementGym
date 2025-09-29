import nodemailer from "nodemailer";
import envVariables from "config/dotenv_config.js";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: envVariables.BREVO_USER,
    pass: envVariables.BREVO_SMTP_KEY,
  },
});

export default async function sendEmail(to, subject, htmlContent) {
  try {
  
    const info = await transporter.sendMail({
      from: envVariables.BREVO_USER,
      to,
      subject,
      html: htmlContent,
    });
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
}
