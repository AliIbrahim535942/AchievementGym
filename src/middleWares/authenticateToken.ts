import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { responseHandler } from "../utils/responseHandler";
import envVariables from "../config/dotenv_config";
export default function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return responseHandler.error(res, "Unauthorized", 401, {});
  }

  jwt.verify(token, envVariables.SECRET_KEY, (error, user) => {
    if (error) {
      console.log(error);
      return responseHandler.error(res, "Forbidden", 403, {});
    }
    req.user = user
    return next();
  });
}
