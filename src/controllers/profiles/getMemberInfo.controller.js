import Coach from "../../models/coach.js";
import GymMember from "../../models/gymMember.js";
import { responseHandler } from "../../utils/responseHandler.js";
async function getMemberInfo(req, res, next) {
  const { memberId } = req.params;
  const { accountType, coachId } = req.user;
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
      const visterId = req.user.memberId;
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
    
  } catch (error) {
    return responseHandler.error(res, "server error", 500, {
      error: error.message,
    });
  }
}
export default getMemberInfo;
