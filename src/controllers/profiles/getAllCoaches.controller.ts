import { Request, Response, NextFunction } from "express";
import Coach from "../../models/coach.js";
import { responseHandler } from "../../utils/responseHandler.js";
async function getAllCoaches(req:Request, res:Response, next:NextFunction) {
  const { sportType } = req.params;
  try {
    const coaches = await Coach.find(
      { sportType },
      { coachId: 1, firstName: 1, lastName: 1, sportType: 1 }
    );
    if (coaches.length == 0) {
      return responseHandler.success(res, "success", []);
    }
    return responseHandler.success(res, "success", coaches);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return responseHandler.error(res, "server error", 500, {
        error: error.message,
      });
    }
    return responseHandler.error(res, "server error", 500);
  }
}
export default getAllCoaches;
