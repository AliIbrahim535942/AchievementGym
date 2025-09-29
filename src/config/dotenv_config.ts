import dotenv from "dotenv";
dotenv.config();
const envVariables = {
  PORT: process.env.PORT || "7900",
  DB_URL: process.env.DB_URL || "mongodb://localhost:27017/test",
  SECRET_KEY: process.env.SECRET_KEY || "QwErTyUiOp1234567890",
  BREVO_USER: process.env.BREVO_USER || "",
  BREVO_SMTP_KEY: process.env.BREVO_SMTP_KEY || "",
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
};
export default envVariables;