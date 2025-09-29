import jwt from "jsonwebtoken";
import { responseHandler } from "../utils/responseHandler.js";
import envVariables from "../config/dotenv_config.js";
export default function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return responseHandler.error(res, "Unauthorized", 401, {});
  }
  
  jwt.verify(token, envVariables.SECRET_KEY, (error, user) => {
    if (error) {
      console.log(error);
      return responseHandler.error(res, "Forbidden", 403, {});
    }
    req.user = { ...user };
    return next();
  });
}
