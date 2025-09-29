import bcrypt from "bcryptjs";
import { responseHandler } from "../utils/responseHandler.js";
import { NextFunction,Request,Response } from "express";
async function passwordHashing(req:Request, res:Response, next:NextFunction) {
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
