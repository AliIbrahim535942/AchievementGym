import Exercise from "../../models/exercise.js";
import { responseHandler } from "../../utils/responseHandler.js";
async function getExercises(req, res, next) {
  const { sportType, accountType } = req.user;
  const { targetMuscle } = req.params;
  try {
    if (accountType != "Coach") {
      return responseHandler.error(res, "you aren't a coach", 403);
    }
    const exercises = await Exercise.find({ targetMuscle, sportType });
    return responseHandler.success(res, "", { exercises: exercises });
  } catch (error) {
    return responseHandler.error(res, "server error", 500, {
      error: error.message,
    });
  }
}
export default getExercises;
