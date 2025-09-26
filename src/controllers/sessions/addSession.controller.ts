import { Request, Response, NextFunction } from "express";
import { responseHandler } from "../../utils/responseHandler.js";
import { getNextSequence } from "../../models/counter.js";
import Session from "../../models/session.js";
import GymMember from "../../models/gymMember.js";
async function addSession(req:Request, res:Response, next:NextFunction) {
  const { memberId, duration, date, exercises } = req.body;
  const user=req.user;
   if (!user) {
     return responseHandler.error(res, "forbidden", 403);
   }
  const { accountType, coachId } = user;
  if (accountType != "Coach") {
    return responseHandler.error(res, "only Coachs can add sessions.", 403);
  }
  try {
    const memberInfo = await GymMember.findOne({ memberId });
    if (!memberInfo) {
      return responseHandler.notFound(res, "member not found");
    }
    if (coachId != memberInfo.coachId) {
      return responseHandler.error(res, "you aren't traning this member", 403);
    }

    const session = new Session({
      sessionId: await getNextSequence("Session"),
      duration,
      date,
      exercises,
      coachId,
      memberId,
    });
    await session.save();
    return responseHandler.success(res, "session added successfully", {
      sessionId: session.sessionId,
      duration: session.duration,
      date: session.date,
      exercises: session.exercises,
      coachId: session.coachId,
      memberId: session.memberId,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return responseHandler.error(res, "server error", 500, {
        error: error.message,
      });
    }
    return responseHandler.error(res, "server error", 500);
  }
}
export default addSession;
