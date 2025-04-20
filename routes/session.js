import { Router } from "express";
//controllers import
import addSession from "../controllers/sessions/addSession.js";
import updateSessionStatus from "../controllers/sessions/updateSessionStatus.js";
import getAllSessions from "../controllers/sessions/getAllSessions.js";
import getSession from "../controllers/sessions/getSession.js";
//middleWares import
import authenticateToken from "../middleWares/authenticateToken.js";
import validator from "../middleWares/validator.js";
// validation schemas import
import updateSessionStatusSchema from "../validations/sessions/updateSessionStatusSchema.js";
import addSessionSchema from "../validations/sessions/addSessionSchema.js";
import getSessionSchema from "../validations/sessions/getSessionSchema.js";

const sessionRouter = Router();
sessionRouter.use(authenticateToken);
sessionRouter.patch(
  "/updateSessionStatus",
  validator(updateSessionStatusSchema, "body"),
  updateSessionStatus
);
sessionRouter.get("/getAllSessions", getAllSessions);
sessionRouter.get(
  "/getSession/:sessionId",
  validator(getSessionSchema, "params"),
  getSession
);
sessionRouter.post(
  "/addSession",
  validator(addSessionSchema, "body"),
  addSession
);
export default sessionRouter;
