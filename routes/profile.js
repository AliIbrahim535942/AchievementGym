import getProgressData from "../controllers/profiles/getProgressData.controller.js";
import getMemberInfo from "../controllers/profiles/getMemberInfo.controller.js";
import getMyMembers from "../controllers/profiles/getMyMembers.controller.js";
import { Router } from "express";
import validator from "../middleWares/validator.js";
import authenticateToken from "../middleWares/authenticateToken.js";
import getProgressDataShema from "../validations/profiles/getProgressDataSchema.js";
import getMemberInfoSchema from "../validations/profiles/getMemberInfoSchema.js";
import getAllCoaches from "../controllers/profiles/getAllCoaches.controller.js";
import getAllCoachesSchema from "../validations/profiles/getAllCoachesSchema.js";
const profileRouter = Router();
profileRouter.get(
  "/getAllCoaches/:sportType",
  validator(getAllCoachesSchema, "params"),
  getAllCoaches
);
profileRouter.use(authenticateToken);
profileRouter.get(
  "/getMemberInfo/:memberId",
  validator(getMemberInfoSchema, "params"),
  getMemberInfo
);
profileRouter.get("/getMyMembers", getMyMembers);
profileRouter.get(
  "/getProgressData/:memberId/:exerciseId",
  validator(getProgressDataShema, "params"),
  getProgressData
);

export default profileRouter;
