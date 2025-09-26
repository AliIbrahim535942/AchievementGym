import authenticateToken from "../middleWares/authenticateToken.js";
import validator from "../middleWares/validator.js";
import { Router } from "express";
//  Controller
import addSession from "../controllers/sessions/addSession.controller.js";
import updateSessionStatus from "../controllers/sessions/updateSessionStatus.controller.js";
import getAllSessions from "../controllers/sessions/getAllSessions.controller.js";
import getSession from "../controllers/sessions/getSession.controller.js";
//  Validation Schemas
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
