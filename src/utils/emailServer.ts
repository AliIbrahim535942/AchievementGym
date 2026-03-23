import nodemailer from "nodemailer";
import envVariables from "../config/dotenv_config";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: envVariables.BREVO_USER,
    pass: envVariables.BREVO_SMTP_KEY,
  },
});

export default async function sendEmail(
  to: string,
  subject: string,
  htmlContent: string,
) {
  try {
    const info = await transporter.sendMail({
      from: envVariables.BREVO_USER,
      to,
      subject,
      html: htmlContent,
    });
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return console.error("server error", 500, {
        error: error.message,
      });
    }
    return console.error("server error", 500);
  }
}
