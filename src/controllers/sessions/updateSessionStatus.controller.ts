import { Request, Response, NextFunction } from "express";
import Session from "../../models/session.js";
import GymMember from "../../models/gymMember.js";
import { responseHandler } from "../../utils/responseHandler.js";

async function updateSessionStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { memberId, sessionId, status } = req.body;
  const user = req.user;
  if (!user) {
    return responseHandler.error(res, "forbidden", 403);
  }
  const { accountType, coachId } = user;
  if (accountType != "Coach") {
    return responseHandler.error(
      res,
      "only Coachs can update sessions status.",
      403
    );
  }
  try {
    const memberInfo = await GymMember.findOne({ memberId });
    if (!memberInfo) {
      return responseHandler.notFound(res, "member not found");
    }
    if (coachId != memberInfo.coachId) {
      return responseHandler.error(res, "you aren't traning this member", 403);
    }
    const session = await Session.findOne({ sessionId });
    if (!session) {
      return responseHandler.notFound(res, "this session is not found ");
    }
    await Session.findOneAndUpdate({ sessionId }, { status });
    return responseHandler.success(res, "status updated successfully");
  } catch (error: unknown) {
    if (error instanceof Error) {
      return responseHandler.error(res, "server error", 500, {
        error: error.message,
      });
    }
    return responseHandler.error(res, "server error", 500);
  }
}
export default updateSessionStatus;
