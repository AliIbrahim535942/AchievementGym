import { responseHandler } from "../../utils/responseHandler.js";
import { getNextSequence } from "../../models/counter.js";
import path from "path";
import Coach from "../../models/coach.js";
import GymMember from "../../models/gymMember.js";
export default async function signup(req, res, next) {
  try {
    const {
      accountType,
      firstName,
      lastName,
      bio,
      phoneNumber,
      email,
      password,
      sportType,
    } = req.body;
    const imageUrl = req.file
      ? req.file.path
      : path.join("uploads", "avatar.jpg");

    if (accountType == "GymMember") {
      if (await GymMember.findOne({ $or: [{ email }, { phoneNumber }] })) {
        return responseHandler.error(res, "this account is already exist", 409);
      }
      const { coachId } = req.body;
      const newMember = new GymMember({
        memberId: await getNextSequence("GymMember"),
        firstName,
        lastName,
        bio,
        phoneNumber,
        email,
        password,
        sportType,
        coachId,
        imageUrl,
      });
      await newMember.save();
      const memberReturnedInfo = {
        memberId: newMember.memberId,
        firstName: newMember.firstName,
        lastName: newMember.lastName,
        bio: newMember.bio,
        sportType: newMember.sportType,
        coachId: newMember.coachId,
        imageUrl: newMember.imageUrl,
        accountType: accountType,
      };
      return responseHandler.success(
        res,
        `user craeated successfuly`,
        memberReturnedInfo
      );
    } else if (accountType == "Coach") {
      if (await Coach.findOne({ $or: [{ email }, { phoneNumber }] })) {
        return responseHandler.error(res, "this account is already exist", 409);
      }
      const newCoach = new Coach({
        coachId: await getNextSequence("Coach"),
        firstName,
        lastName,
        bio,
        phoneNumber,
        email,
        password,
        sportType,
        imageUrl,
      });
      await newCoach.save();
      const coachReturnedInfo = {
        coachId: newCoach.coachId,
        firstName: newCoach.firstName,
        lastName: newCoach.lastName,
        bio: newCoach.bio,
        sportType: newCoach.sportType,
        imageUrl: newCoach.imageUrl,
        accountType: accountType,
      };
      return responseHandler.success(
        res,
        `coach craeated successfuly`,
        coachReturnedInfo
      );
    }
  } catch (error) {
    return responseHandler.error(res, "server error", 500, {
      error: error.message,
    });
  }
}
