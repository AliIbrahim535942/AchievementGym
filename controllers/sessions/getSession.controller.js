import Session from "../../models/session.js";
import { responseHandler } from "../../utils/responseHandler.js";
async function getSession(req, res, next) {
  const { sessionId } = req.params;
  const { memberId, coachId } = req.user;
  try {
    const session = await Session.findOne({ sessionId });
    if (!session) {
      return responseHandler.notFound(res, "session not found");
    }
    if (session.memberId != memberId && session.coachId != coachId) {
      return responseHandler.error(res, "you can't access", 403);
    }
    responseHandler.success(res, "Session info retrived successfully ", {
      session: session,
    });
  } catch (error) {
    return responseHandler.error(res, "server error", 500, {
      error: error.message,
    });
  }
}
export default getSession;
