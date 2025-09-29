import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import PasswordResetToken from "../../models/passwordResetToken.js";
import GymMember from "../../models/gymMember.js";
import Coach from "../../models/coach.js";
import { responseHandler } from "../../utils/responseHandler.js";
import envVariables from "config/dotenv_config.js";

export default async function resetPassword(
  req: Request<{ token: string; password: string }>,
  res: Response,
  next: NextFunction
) {
  const { token, password } = req.body;
  try {
    const resetToken = await PasswordResetToken.findOne({ token });
    if (!resetToken) {
      return responseHandler.error(res, "Invalid or expired token", 400);
    }

    const tokenInfo = jwt.verify(token, envVariables.SECRET_KEY) as jwt.JwtPayload & {
      accountType: "GymMember" | "Coach";
      userId: string;
    };
    let user;
    if (tokenInfo.accountType == "GymMember") {
      user = await GymMember.findOne({ memberId: tokenInfo.userId });
    } else if (tokenInfo.accountType == "Coach") {
      user = await Coach.findOne({ coachId: tokenInfo.userId });
    }
    if (!user) {
      return responseHandler.error(res, "User not found", 404);
    }

    user.password = password;
    await user.save();

    await PasswordResetToken.deleteOne({ token });

    return responseHandler.success(res, "Password has been reset successfully");
  } catch (error: unknown) {
    if (error instanceof Error) {
      return responseHandler.error(res, "server error", 500, {
        error: error.message,
      });
    }
    return responseHandler.error(res, "server error", 500);
  }
}
