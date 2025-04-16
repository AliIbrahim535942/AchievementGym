import jwt from "jsonwebtoken";
import { responseHandler } from "../utils/responseHandler.js";
export default function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return responseHandler.error(res, "Unauthorized", 401, {});
  }
// console.log(process.env.JWT_SECRET_KEY);
  jwt.verify(token, "qwertyuiopASDFGHJKL1234567890", (error, user) => {
    if (error) {
      console.log(error);
      return responseHandler.error(res, "Forbidden", 403, {});
    }
    req.user = { ...user };
    return next();
  });
}
