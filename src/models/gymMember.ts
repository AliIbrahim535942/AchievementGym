import mongoose, { Schema, Document } from "mongoose";
interface IGymMember extends Document {
  memberId: number;
  firstName: string;
  lastName: string;
  bio: string;
  phoneNumber: string;
  email: string;
  password: string;
  sportType: "Calisthenics" | "Body building" | "Powerlifting";
  coachId: number;
  imageUrl: string;
}
const GymMemberSchema = new Schema<IGymMember>({
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
  coachId: { type: Number, required: true, ref: "Coach" },
  imageUrl: { type: String, required: false },
});
const GymMember = mongoose.model<IGymMember>("GymMember", GymMemberSchema, "GymMembers");
export default GymMember;
