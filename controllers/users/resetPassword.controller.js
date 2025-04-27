import jwt from "jsonwebtoken";
import PasswordResetToken from "../../models/passwordResetToken.js";
import GymMember from "../../models/gymMember.js";
import Coach from "../../models/coach.js";
import { responseHandler } from "../../utils/responseHandler.js";

export default async function resetPassword(req, res, next) {
  const { token, password } = req.body;
  try {
    const resetToken = await PasswordResetToken.findOne({ token });
    if (!resetToken) {
      return responseHandler.error(res, "Invalid or expired token", 400);
    }

    const tokenInfo = jwt.verify(token, process.env.SECRET_KEY);
    let user;
    if (tokenInfo.accountType == "Gymmember") {
      user = await GymMember.findById(tokenInfo.userId);
    } else if (tokenInfo.accountType == "Coach") {
      user = await Coach.findById(tokenInfo.userId);
    }
    if (!user) {
      return responseHandler.error(res, "User not found", 404);
    }

    user.password = password;
    await user.save();

    await PasswordResetToken.deleteOne({ token });

    return responseHandler.success(res, "Password has been reset successfully");
  } catch (err) {
    return responseHandler.error(
      res,
      "server error during password reset",
      500
    );
  }
}
