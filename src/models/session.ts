import mongoose, { Schema, Document } from "mongoose";
interface IExercise extends Document {
  exerciseId: number;
  weight: number;
}
interface ISession extends Document {
  sessionId: number;
  memberId: number;
  duration: number;
  date: Date;
  coachId: number;
  exercises: IExercise[];
  status: "Pending" | "Completed";
}
const sessionSchema = new Schema<ISession>({
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
const Session = mongoose.model<ISession>("Session", sessionSchema, "Sessions");
export default Session;
