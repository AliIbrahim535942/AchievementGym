import { Request, Response, NextFunction } from "express";
import GymMember from "../../models/gymMember.js";
import { responseHandler } from "../../utils/responseHandler.js";
async function getMyMembers(req:Request, res:Response, next:NextFunction) {
  const user=req.user
   if (!user) {
     return responseHandler.error(res, "forbidden", 403);
   }
  const { accountType, coachId } = user;
  try {
    if (accountType != "Coach") {
      return responseHandler.error(res, "you are not a coach", 403);
    }
    const gymMembers = await GymMember.find(
      { coachId },
      "memberId firstName lastName imageUrl -_id"
    );
    if (gymMembers.length == 0) {
      return responseHandler.success(res, "there are not any Gym Members", {
        sessions: [],
      });
    }
    return responseHandler.success(res, "", { gymMembers: gymMembers });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return responseHandler.error(res, "server error", 500, {
        error: error.message,
      });
    }
    return responseHandler.error(res, "server error", 500);
  }
}
export default getMyMembers;
