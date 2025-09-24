import bcrypt from "bcryptjs";
import { responseHandler } from "../utils/responseHandler.js";
async function passwordHashing(req, res, next) {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    return next();
  } catch (error) {
    console.log(error);
    return responseHandler.error(res, "hashing password failed", 500, {
      error: error,
    });
  }
}
export default passwordHashing;
