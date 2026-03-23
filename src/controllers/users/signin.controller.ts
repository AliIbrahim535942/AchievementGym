import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import { responseHandler } from "../../utils/responseHandler";
import Coach from "../../models/coach";
import GymMember from "../../models/gymMember";
import envVariables from "../../config/dotenv_config";
async function signin(
  req: Request<{ email: string; password: string; accountType: string }>,
  res: Response,
  next: NextFunction,
) {
  const { email, password, accountType } = req.body;
  try {
    const user =
      accountType === "Coach"
        ? await Coach.findOne(
            { email },
            "sportType coachId email password -_id",
          )
        : await GymMember.findOne(
            { email },
            "memberId email password coachId -_id",
          );
    if (!user) {
      return responseHandler.notFound(res, "account is not exist");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return responseHandler.error(res, "wrong password", 403);
    }
    const { password: removerdPassword, ...tokenInfo } = user;

    const token = jwt.sign(
      { ...tokenInfo, accountType },
      envVariables.SECRET_KEY,
    );
    return responseHandler.success(res, "login successfuly", {
      token: token,
      accountType,
      tokenInfo,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return responseHandler.error(res, "server error", 500, {
        error: error.message,
      });
    }
    return responseHandler.error(res, "server error", 500);
  }
}
export default signin;
