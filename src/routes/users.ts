import passwordHashing from "../middleWares/passwordHashing";
import validator from "../middleWares/validator";
import { uploadOptional } from "../middleWares/multerConfig";
import { Router } from "express";
//  Controller
import signin from "../controllers/users/signin.controller";
import signup from "../controllers/users/signup.controller";
import forgetPassword from "../controllers/users/forgetPassword.controller";
import resetPassword from "../controllers/users/resetPassword.controller";
//  Validation Schemas
import signupValidationSchema from "../validations/users/signupSchema";
import signinValidationSchema from "../validations/users/signinSchema";
import forgetPasswordValidationSchema from "../validations/users/forgetPasswordSchema";
import resetPasswordValidationSchema from "../validations/users/resetPasswordSchema";

const userRouter = Router();

userRouter.post("/signin", validator(signinValidationSchema, "body"), signin);
userRouter.post(
  "/signup",
  validator(signupValidationSchema, "body"),
  uploadOptional("imageUrl"),
  passwordHashing,
  signup,
);
userRouter.post(
  "/forgetPassword",
  validator(forgetPasswordValidationSchema, "body"),
  forgetPassword,
);
userRouter.post(
  "/resetPassword",
  validator(resetPasswordValidationSchema, "body"),
  passwordHashing,
  resetPassword,
);

export default userRouter;
