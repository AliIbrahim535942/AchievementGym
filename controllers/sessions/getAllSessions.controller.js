import Session from "../../models/session.js";
import { responseHandler } from "../../utils/responseHandler.js";
async function getAllSessions(req, res, next) {
  const { memberId, coachId, accountType } = req.user;
  let filter;
  try {
    if (accountType == "Coach") {
      filter = { coachId: coachId };
    } else if (accountType == "GymMember") {
      filter = { memberId };
    }
    const sessions = await Session.aggregate([
      { $match: filter },
      { $unwind: "$exercises" },
      {
        $lookup: {
          from: "Exercises",
          localField: "exercises.exerciseId",
          foreignField: "exerciseId",
          as: "exerciseDetails",
        },
      },
      { $unwind: "$exerciseDetails" },
      {
        $lookup: {
          from: "GymMembers",
          localField: "memberId",
          foreignField: "memberId",
          as: "memberInfo",
        },
      },
      { $unwind: { path: "$memberInfo", preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: "$sessionId",
          duration: { $first: "$duration" },
          status: { $first: "$status" },
          date: { $first: "$date" },
          memberName: { $first: "$memberInfo.firstName" },
          targetMuscles: { $addToSet: "$exerciseDetails.targetMuscle" },
        },
      },
      {
        $project: {
          _id: 0,
          sessionId: "$_id",
          duration: 1,
          status: 1,
          date: 1,
          coachName: 1,
          targetMuscles: 1,
        },
      },
    ]);

    return responseHandler.success(res, "sessions retrived successfully", {
      sessions: sessions,
    });
  } catch (error) {
    return responseHandler.error(res, "server error", 500, {
      error: error.message,
    });
  }
}
export default getAllSessions;
