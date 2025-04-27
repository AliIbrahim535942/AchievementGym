import passwordHashing from "../middleWares/passwordHashing.js";
import validator from "../middleWares/validator.js";
import { uploadOptional } from "../middleWares/multerConfig.js";
import { Router } from "express";
//  Controller
import signin from "../controllers/users/signin.controller.js";
import signup from "../controllers/users/signup.controller.js";
import forgetPassword from "../controllers/users/forgetPassword.controller.js";
import resetPassword from "../controllers/users/resetPassword.controller.js";
//  Validation Schemas
import signupValidationSchema from "../validations/users/signupSchema.js";
import signinValidationSchema from "../validations/users/signinSchema.js";
import forgetPasswordValidationSchema from "../validations/users/forgetPasswordSchema.js";
import resetPasswordValidationSchema from "../validations/users/resetPasswordSchema.js";

const userRouter = Router();

userRouter.post("/signin", validator(signinValidationSchema, "body"), signin);
userRouter.post(
  "/signup",
  validator(signupValidationSchema, "body"),
  uploadOptional("imageUrl"),
  passwordHashing,
  signup
);
userRouter.post(
  "/forgetPassword",
  validator(forgetPasswordValidationSchema, "body"),
  forgetPassword
);
userRouter.post(
  "/resetPassword",
  validator(resetPasswordValidationSchema, "body"),
  passwordHashing,
  resetPassword
);

export default userRouter;
