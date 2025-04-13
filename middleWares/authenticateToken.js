import jwt from "jsonwebtoken";
import { responseHandler } from "../utils/responseHandler.js";
export default function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    responseHandler.error(res, "Unauthorized", 401, {});
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return responseHandler.error(res, "Forbidden", 403, {});
    }

    req.user = { ...user };
  });
  next();
}
