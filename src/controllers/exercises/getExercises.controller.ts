import { Request, Response, NextFunction } from "express";
import Exercise from "../../models/exercise.js";
import { responseHandler } from "../../utils/responseHandler.js";
async function getExercises(req: Request, res: Response, next: NextFunction) {
  const user = req.user;
  if (!user) {
    return responseHandler.error(res, "forbidden", 403);
  }
  const { sportType, accountType } = user;
  const { targetMuscle } = req.params;
  try {
    if (accountType != "Coach") {
      return responseHandler.error(res, "you aren't a coach", 403);
    }
    const exercises = await Exercise.find({ targetMuscle, sportType });
    return responseHandler.success(res, "", { exercises: exercises });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return responseHandler.error(res, "server error", 500, {
        error: error.message,
      });
    }
    return responseHandler.error(res, "server error", 500);
  }
}
export default getExercises;
