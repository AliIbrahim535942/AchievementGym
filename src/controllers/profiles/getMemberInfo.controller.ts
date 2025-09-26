import { Request, Response, NextFunction } from "express";
import Coach from "../../models/coach.js";
import GymMember from "../../models/gymMember.js";
import { responseHandler } from "../../utils/responseHandler.js";
async function getMemberInfo(req:Request, res:Response, next:NextFunction) {
  const { memberId } = req.params;
  const user=req.user;
   if (!user) {
    return responseHandler.error(res, "forbidden", 403);
  }
  const { accountType, coachId } =user;
  var gymMember;
  try {
    if (accountType === "Coach") {
      gymMember = await GymMember.findOne(
        { memberId, coachId },
        "memberId firstName lastName phoneNumber email sportType coachId imageUrl -_id"
      );
      if (!gymMember) {
        return responseHandler.error(
          res,
          "this member is not existing in your team",403
        );
      }
    } else if (accountType === "GymMember") {
      const visterId = user.memberId;
      if (visterId != memberId) {
        return responseHandler.error(res, "you can only view your profile",403);
      }
      gymMember = await GymMember.findOne(
        { memberId, coachId },
        "memberId firstName lastName phoneNumber email sportType coachId imageUrl -_id"
      );
    }
    if (!gymMember) {
      return responseHandler.notFound(res, "Member not found");
    }
    const coach = await Coach.findOne(
      { coachId: gymMember.coachId },
      "coachId firstName lastName imageUrl -_id"
    );
    if (!coach) {
      return responseHandler.notFound(res, "coach not found");
    }
    const profileInfo = { memberInfo: gymMember, coachInfo: coach };
    return responseHandler.success(res, "info retrived successfuly ", profileInfo);
    
  }catch (error: unknown) {
    if (error instanceof Error) {
      return responseHandler.error(res, "server error", 500, {
        error: error.message,
      });
    }
    return responseHandler.error(res, "server error", 500);
  }
  }

export default getMemberInfo;
