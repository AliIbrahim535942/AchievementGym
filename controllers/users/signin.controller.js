import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { responseHandler } from "../../utils/responseHandler.js";
import Coach from "../../models/coach.js";
import GymMember from "../../models/gymMember.js";
async function signin(req, res, next) {
  const { email, password, accountType } = req.body;

  const user =
    accountType === "Coach"
      ? await Coach.findOne({ email }, "sportType coachId email password -_id")
      : await GymMember.findOne(
          { email },
          "memberId email password coachId -_id"
        );
  if (!user) {
    return responseHandler.notFound(res, "you dont have an account");
  }
  const isMatch = bcrypt.compare(user.password, password);
  if (!isMatch) {
    return responseHandler.error(res, "wrong password", 403);
  }
  const { password: removerdPassword, ...tokenInfo } = user._doc;
  console.log({ ...tokenInfo, accountType }, process.env.SECRET_KEY);

  const token = jwt.sign({ ...tokenInfo, accountType }, process.env.SECRET_KEY);
  return responseHandler.success(res, "login successfuly", { token: token });
}
export default signin;
