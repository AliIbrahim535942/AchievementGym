import mongoose, { Schema } from "mongoose";
const GymMemberSchema = new Schema(
  {
    memberId: { type: Number, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    bio: { type: String, required: false },
    phoneNumber: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // email format
    },
    password: { type: String, required: true },
    sportType: {
      type: String,
      required: true,
      enum: ["Calisthenics", "Body building", "Powerlifting"],
    },
    coachId: { type: Number, required: true,ref:"Coach" },
    imageUrl: { type: String, required: false },
  },
);
const GymMember = mongoose.model("GymMember", GymMemberSchema, "GymMembers");
export default GymMember;
