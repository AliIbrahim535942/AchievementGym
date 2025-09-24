import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { responseHandler } from "../utils/responseHandler.js";
export default function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return responseHandler.error(res, "Unauthorized", 401, {});
  }
  dotenv.config();
  const secretKey = process.env.SECRET_KEY;
  
  jwt.verify(token, secretKey, (error, user) => {
    if (error) {
      console.log(error);
      return responseHandler.error(res, "Forbidden", 403, {});
    }
    req.user = { ...user };
    return next();
  });
}
