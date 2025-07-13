import GymMember from "../../models/gymMember.js";
import { responseHandler } from "../../utils/responseHandler.js";
async function getMyMembers(req, res, next) {
  const { accountType, coachId } = req.user;
  try {
    if (accountType != "Coach") {
      return responseHandler.error(res, "you are not a coach", 403);
    }
    const gymMembers = await GymMember.find(
      { coachId },
      "memberId firstName lastName imageUrl -_id"
    );
    if (gymMembers.length==0) {
      return responseHandler.notFound(res, "there are not any Gym Members");
    }
    return responseHandler.success(res, "", { gymMembers: gymMembers });
  } catch (error) {
    return responseHandler.error(res, "server error", 500, {
      error: error.message,
    });
  }
}
export default getMyMembers;
