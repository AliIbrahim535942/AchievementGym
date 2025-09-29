import { v2 as cloudinary } from "cloudinary";
import envVariables from "./dotenv_config.js";

cloudinary.config({
  cloud_name: envVariables.CLOUDINARY_CLOUD_NAME,
  api_key: envVariables.CLOUDINARY_API_KEY,
  api_secret: envVariables.CLOUDINARY_API_SECRET,
});

export default cloudinary;
