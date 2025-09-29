import { responseHandler } from "../../utils/responseHandler.js";
import { getNextSequence } from "../../models/counter.js";
import Coach from "../../models/coach.js";
import cloudinary from "../../config/cloudinary.js";
import streamifier from "streamifier";
import GymMember from "../../models/gymMember.js";
import { Response, Request, NextFunction } from "express";
export default async function signup(
  req: Request<{
    accountType: string;
    firstName: string;
    lastName: string;
    bio: string;
    phoneNumber: string;
    email: string;
    password: string;
    sportType: "Coach" | "GymMember";
  }>,
  res: Response,
  next: NextFunction
) {
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

    let imageUrl =
      "https://res.cloudinary.com/dp37em2er/image/upload/v1759144795/avatar_oufabh.jpg";
    if (req.file) {
      imageUrl = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "userImages" },
          (error, result) => {
            if (error) return reject(error);
            else if(result){resolve(result.secure_url);}
          }
        );
        streamifier.createReadStream(req.file!.buffer).pipe(uploadStream);
      });
    }

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
  } catch (error: unknown) {
    if (error instanceof Error) {
      return responseHandler.error(res, "server error", 500, {
        error: error.message,
      });
    }
    return responseHandler.error(res, "server error", 500);
  }
}
