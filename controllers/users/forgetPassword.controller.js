import jwt from "jsonwebtoken";
import PasswordResetToken from "../../models/passwordResetToken.js";
import GymMember from "../../models/gymMember.js";
import Coach from "../../models/coach.js";
import { responseHandler } from "../../utils/responseHandler.js";
import sendEmail from "../../utils/emailServer.js";
export default async function forgetPassword(req, res, next) {
  const { email, accountType } = req.body;
  try {
    let user;
    if (accountType == "Coach") {
      user = await Coach.findOne({ email });
    } else if (accountType == "GymMember") {
      user = await GymMember.findOne({ email });
    }

    if (!user) {
      return responseHandler.error(res, "User not found", 404);
    }

    const token = jwt.sign(
      {
        accountType,
        userId: accountType == "Coach" ? user.coachId : user.memberId,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );

    await PasswordResetToken.create({
      userId: accountType == "Coach" ? user.coachId : user.memberId,
      accountType,
      token,
    });

    await sendEmail(
      user.email,
      "Reset Your AchievementGym Password",
      `<!DOCTYPE html>
<html lang="en" style="font-family: Arial, sans-serif;">
<head>
  <meta charset="UTF-8">
  <title>Password Reset</title>
</head>
<body style="background-color: #f7f7f7; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #333333;">Hello,</h2>
    <p style="font-size: 16px; color: #555555;">
      We received a request to reset your AchievementGym account password.
    </p>
    <p style="font-size: 16px; color: #555555;">
      Use the following verification code to reset your password:
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <div style="display: inline-block; padding: 15px 25px; background-color: #f1f1f1; border-radius: 5px; font-size: 24px; font-weight: bold; color: #333333;">
        ${token}
      </div>
    </div>

    <p style="font-size: 14px; color: #888888;">
      Please copy this code and paste it into the required field.
    </p>
    <p style="font-size: 14px; color: #888888;">
      This code will expire in 15 mintue.
    </p>
  </div>
</body>
</html>
`
    );
    return responseHandler.success(
      res,
      "check your mail box please your key expires after 15 mintue"
    );
  } catch (error) {
    responseHandler.error(res, "server error during email sending", 500);
  }
}
