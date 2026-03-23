import getProgressData from "../controllers/profiles/getProgressData.controller";
import getMemberInfo from "../controllers/profiles/getMemberInfo.controller";
import getMyMembers from "../controllers/profiles/getMyMembers.controller";
import { Router } from "express";
import validator from "../middleWares/validator";
import authenticateToken from "../middleWares/authenticateToken";
import getProgressDataShema from "../validations/profiles/getProgressDataSchema";
import getMemberInfoSchema from "../validations/profiles/getMemberInfoSchema";
import getAllCoaches from "../controllers/profiles/getAllCoaches.controller";
import getAllCoachesSchema from "../validations/profiles/getAllCoachesSchema";
const profileRouter = Router();
profileRouter.get(
  "/getAllCoaches/:sportType",
  validator(getAllCoachesSchema, "params"),
  getAllCoaches,
);
profileRouter.use(authenticateToken);
profileRouter.get(
  "/getMemberInfo/:memberId",
  validator(getMemberInfoSchema, "params"),
  getMemberInfo,
);
profileRouter.get("/getMyMembers", getMyMembers);
profileRouter.get(
  "/getProgressData/:memberId/:exerciseId",
  validator(getProgressDataShema, "params"),
  getProgressData,
);

export default profileRouter;
