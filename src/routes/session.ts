import authenticateToken from "../middleWares/authenticateToken";
import validator from "../middleWares/validator";
import { Router } from "express";
//  Controller
import addSession from "../controllers/sessions/addSession.controller";
import updateSessionStatus from "../controllers/sessions/updateSessionStatus.controller";
import getAllSessions from "../controllers/sessions/getAllSessions.controller";
import getSession from "../controllers/sessions/getSession.controller";
//  Validation Schemas
import updateSessionStatusSchema from "../validations/sessions/updateSessionStatusSchema";
import addSessionSchema from "../validations/sessions/addSessionSchema";
import getSessionSchema from "../validations/sessions/getSessionSchema";

const sessionRouter = Router();
sessionRouter.use(authenticateToken);
sessionRouter.patch(
  "/updateSessionStatus",
  validator(updateSessionStatusSchema, "body"),
  updateSessionStatus,
);
sessionRouter.get("/getAllSessions", getAllSessions);
sessionRouter.get(
  "/getSession/:sessionId",
  validator(getSessionSchema, "params"),
  getSession,
);
sessionRouter.post(
  "/addSession",
  validator(addSessionSchema, "body"),
  addSession,
);

export default sessionRouter;
