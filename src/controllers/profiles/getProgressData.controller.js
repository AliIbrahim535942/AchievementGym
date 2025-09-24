import Exercise from "../../models/exercise.js";
import GymMember from "../../models/gymMember.js";
import Session from "../../models/session.js";
import { responseHandler } from "../../utils/responseHandler.js";

async function getProgressData(req, res, next) {
  try {
    const { accountType } = req.user;
    const { memberId, exerciseId } = req.params;
    const gymMember = await GymMember.findOne({ memberId });
    const exercise = await Exercise.findOne({ exerciseId:Number(exerciseId) });
    if (!exercise) {
      return responseHandler.notFound(res, "exercise not found");
    }
    if (!gymMember) {
      return responseHandler.notFound(res, "member not found");
    }
    if (accountType == "Coach") {
      const { coachId } = req.user;

      if (coachId != gymMember.coachId) {
        return responseHandler.error(
          res,
          "you are not traning this member ",
          403
        );
      }
    } else if (accountType == "GymMember") {
      const myId = req.user.memberId;
      if (memberId != myId) {
        return responseHandler.error(res, "you can not access ", 403);
      }
    }
    const allSessions = await Session.find({ memberId });
    if (allSessions.length === 0) {
      return responseHandler.notFound(res, "No sessions found");
    }

    const progress = allSessions
      .map((session) => {
        const match = session.exercises?.find(
          (ex) => ex.exerciseId === Number(exerciseId)
        );
        if (match) {
          return {
            date: session.date,
            weight: match.weight,
          };
        }
        return null;
      })
      .filter(Boolean) // إزالة null
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return responseHandler.success(res, "success", {
      exerciseId: exerciseId,
      exerciseName: exercise.exerciseName,
      progress: progress,
    });
  } catch (error) {
    return responseHandler.error(res, "server error", 500, {
      error: error.message,
    });
  }
}

export default getProgressData;
