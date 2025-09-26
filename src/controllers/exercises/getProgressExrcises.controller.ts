import { Request, Response, NextFunction } from "express";
import Session from "../../models/session.js";
import Exercise from "../../models/exercise.js";
import { responseHandler } from "../../utils/responseHandler.js";
async function getProgressExercises(req:Request, res:Response, next:NextFunction) {
  const { memberId } = req.params;
  try {
    const sessions = await Session.find({ memberId });
    if (!sessions) {
      responseHandler.notFound(res, "you do not have any sessions yet");
    }
    const uniqueExerciseIds = Array.from(
      new Set(
        sessions.flatMap((session) =>
          session.exercises.map((ex) => ex.exerciseId)
        )
      )
    );
    const exercises = await Exercise.find({
      exerciseId: { $in: uniqueExerciseIds },
    });
    if (!sessions) {
      responseHandler.notFound(res, "exercises not found");
    }
    responseHandler.success(res, "", { exercises: exercises });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return responseHandler.error(res, "server error", 500, {
        error: error.message,
      });
    }
    return responseHandler.error(res, "server error", 500);
  }
}
export default getProgressExercises;
