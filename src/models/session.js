import mongoose, { Schema } from "mongoose";
const sessionSchema = new Schema({
  sessionId: { type: Number, required: true, unique: true },
  memberId: { type: Number, required: true, ref: "GymMember" },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
  coachId: { type: Number, required: true, ref: "Coach" },
  exercises: [
    {
      exerciseId: {
        type: Number,
        required: true,
        ref: "Exercise",
      },
      weight: { type: Number },
    },
  ],
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
});
const Session = mongoose.model("Session", sessionSchema, "Sessions");
export default Session;
