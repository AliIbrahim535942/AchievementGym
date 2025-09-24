import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_SMTP_KEY,
  },
});

export default async function sendEmail(to, subject, htmlContent) {
  try {
  
    const info = await transporter.sendMail({
      from: process.env.BREVO_USER,
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
