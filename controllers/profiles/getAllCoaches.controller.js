import Coach from "../../models/coach.js";
import { responseHandler } from "../../utils/responseHandler.js";
async function getAllCoaches(req, res, next) {
  const { sportType } = req.params;
  try {
    const coaches = await Coach.find(
      { sportType },
      { coachId: 1, firstName: 1, lastName: 1, sportType: 1 }
    );
    if (coaches.length == 0) {
      return responseHandler.notFound(res, "there are not any caoches");
    }
    return responseHandler.success(res, "success", coaches);
  } catch (error) {
    return responseHandler.error(res, "server error", 500, {
      error: error.message,
    });
  }
}
export default getAllCoaches;
