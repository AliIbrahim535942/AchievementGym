import { Request, Response, NextFunction } from "express";
import Session from "../../models/session.js";
import { responseHandler } from "../../utils/responseHandler.js";
async function getSession(req:Request, res:Response, next:NextFunction) {
  const { sessionId } = req.params;
  const user=req.user 
  if (!user) {
    return responseHandler.error(res, "forbidden", 403);
  }
  const { accountType, coachId } = user;
  try {
    const session = await Session.findOne({ sessionId });
    if (!session) {
      return responseHandler.notFound(res, "session not found");
    }
    if (accountType == "Coach" && coachId != session.coachId) {
      return responseHandler.error(
        res,
        "you can not access to this session ",
        403
      );
    } else if (
      accountType == "GymMember" &&
      user.memberId != session.memberId
    ) {
      return responseHandler.error(
        res,
        "you can not access to this session ",
        403
      );
    }

    const sessionInfo = await Session.aggregate([
      { $match: { sessionId: sessionId } },

      // خزّن التمارين الأصلية
      {
        $addFields: {
          originalExercises: "$exercises",
        },
      },

      // اجلب تفاصيل التمارين
      {
        $lookup: {
          from: "Exercises",
          localField: "exercises.exerciseId",
          foreignField: "exerciseId",
          as: "exerciseDetails",
        },
      },

      // أعد تشكيل التمارين لتشمل الاسم والوزن
      {
        $addFields: {
          exercises: {
            $map: {
              input: "$originalExercises",
              as: "orig",
              in: {
                exerciseId: "$$orig.exerciseId",
                weight: "$$orig.weight",
                exerciseName: {
                  $arrayElemAt: [
                    {
                      $map: {
                        input: {
                          $filter: {
                            input: "$exerciseDetails",
                            as: "detail",
                            cond: {
                              $eq: ["$$detail.exerciseId", "$$orig.exerciseId"],
                            },
                          },
                        },
                        as: "d",
                        in: "$$d.exerciseName",
                      },
                    },
                    0,
                  ],
                },
              },
            },
          },
        },
      },

      {
        $project: {
          _id: 0,
          sessionId: 1,
          duration: 1,
          memberId: 1,
          date: 1,
          coachId: 1,
          exercises: 1,
          status: 1,
        },
      },
    ]);

    if (!sessionInfo) {
      return responseHandler.error(
        res,
        "error during match session and exercises",
        400
      );
    }
    return responseHandler.success(res, "success", sessionInfo[0]);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return responseHandler.error(res, "server error", 500, {
        error: error.message,
      });
    }
    return responseHandler.error(res, "server error", 500);
  }
}
export default getSession;
