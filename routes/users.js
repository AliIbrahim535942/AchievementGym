import { Router } from "express";
import signin from "../controllers/users/signin.controller.js";
import signup from "../controllers/users/signup.controller.js";
import passwordHashing from "../middleWares/passwordHashing.js";
import { uploadOptional } from "../middleWares/multerConfig.js";
import validator from "../middleWares/validator.js";
import signupValidationSchema from "../validations/users/signupSchema.js";
import signinValidationSchema from "../validations/users/signinSchema.js";

const userRouter = Router();
userRouter.post("/signin", validator(signinValidationSchema, "body"), signin);
userRouter.post(
  "/signup",
  validator(signupValidationSchema, "body"),
  uploadOptional("imageUrl"),
  passwordHashing,
  signup
);
export default userRouter;
