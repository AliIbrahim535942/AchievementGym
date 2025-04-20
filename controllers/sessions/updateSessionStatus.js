import Session from "../../models/session.js";
import GymMember from "../../models/gymMember.js";
import { responseHandler } from "../../utils/responseHandler.js";

async function updateSessionStatus(req, res, next) {
  const { memberId, sessionId, status } = req.body;
  const { accountType, coachId } = req.user;
  if (accountType != "Coach") {
    return responseHandler.error(res, "only Coachs can add sessions.", 403);
  }
  try {
    const memberInfo = await GymMember.findOne({ memberId });
    if (coachId != memberInfo.coachId) {
      return responseHandler.error(res, "you aren't traning this member", 403);
    }
    const session = await Session.findOne({ sessionId });
    if (!session) {
      return responseHandler.notFound(res, "this session is not found ");
    }
    await Session.findOneAndUpdate({ sessionId }, { status });
    return responseHandler.success(res, "status updated successfully");
  } catch (error) {
    return responseHandler.error(res, "server error", 500, {
      error: error.message,
    });
  }
}
export default updateSessionStatus;
