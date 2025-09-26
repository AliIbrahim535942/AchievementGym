import { Request, Response, NextFunction } from "express";
import Session from "../../models/session.js";
import { responseHandler } from "../../utils/responseHandler.js";
async function getAllSessions(req:Request, res:Response, next:NextFunction) {
  const user=req.user;
 if (!user) {
   return responseHandler.error(res, "forbidden", 403);
 }
  const { accountType } = user;
  let filter;

  try {
    // تحديد الفلتر حسب نوع المستخدم
    if (accountType == "Coach") {
      const { coachId } = user;
      filter = { coachId: coachId };
    } else if (accountType == "GymMember") {
      const { memberId } = user;
      filter = { memberId };
    } else {
      // إذا كان نوع آخر، لا نعرض أي جلسات
      return responseHandler.error(res, "Unauthorized access", 403);
    }

    const sessions = await Session.aggregate([
      { $match: filter },
      // Lookup معلومات الكوتش
      {
        $lookup: {
          from: "Coachs",
          localField: "coachId",
          foreignField: "coachId",
          as: "coachInfo",
        },
      },
      { $unwind: { path: "$coachInfo", preserveNullAndEmptyArrays: true } },
      // Lookup معلومات اللاعب
      {
        $lookup: {
          from: "GymMembers",
          localField: "memberId",
          foreignField: "memberId",
          as: "memberInfo",
        },
      },
      { $unwind: { path: "$memberInfo", preserveNullAndEmptyArrays: true } },
      // Unwind التمارين
      { $unwind: "$exercises" },
      // Lookup تفاصيل التمارين للحصول على العضلات المستهدفة
      {
        $lookup: {
          from: "Exercises",
          localField: "exercises.exerciseId",
          foreignField: "exerciseId",
          as: "exerciseDetails",
        },
      },
      {
        $unwind: { path: "$exerciseDetails", preserveNullAndEmptyArrays: true },
      },
      // تجميع النتائج
      {
        $group: {
          _id: "$sessionId",
          sessionId: { $first: "$sessionId" },
          duration: { $first: "$duration" },
          status: { $first: "$status" },
          date: { $first: "$date" },
          coachId: { $first: "$coachId" },
          memberId: { $first: "$memberId" },
          // معلومات الكوتش
          coachName: {
            $first: {
              $concat: ["$coachInfo.firstName", " ", "$coachInfo.lastName"],
            },
          },
          coachEmail: { $first: "$coachInfo.email" },
          // معلومات اللاعب
          memberName: {
            $first: {
              $concat: ["$memberInfo.firstName", " ", "$memberInfo.lastName"],
            },
          },
          memberEmail: { $first: "$memberInfo.email" },
          imageUrl: { $first: "$memberInfo.imageUrl" },
          // العضلات المستهدفة فقط (بدون تكرار)
          targetMuscles: { $addToSet: "$exerciseDetails.targetMuscle" },
        },
      },
      // ترتيب النتائج
      { $sort: { date: -1 } },
      // إزالة الحقول غير المطلوبة
      {
        $project: {
          _id: 0,
          imageUrl: 1,
          sessionId: 1,
          duration: 1,
          status: 1,
          date: 1,
          coachId: 1,
          memberId: 1,
          coachName: 1,
          coachEmail: 1,
          memberName: 1,
          memberEmail: 1,
          targetMuscles: 1,
        },
      },
    ]);

    return responseHandler.success(res, "sessions retrieved successfully", {
      sessions: sessions,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return responseHandler.error(res, "server error", 500, {
        error: error.message,
      });
    }
    return responseHandler.error(res, "server error", 500);
  }
}

export default getAllSessions;
