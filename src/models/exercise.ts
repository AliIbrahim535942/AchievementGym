import mongoose, { Schema, Document } from "mongoose";
interface IExercise extends Document {
  exerciseId: Number;
  exerciseName: String;
  sportType: "Calisthenics" | "Body building" | "Powerlifting";
  targetMuscle: string;
}
const exerciseSchema = new Schema<IExercise>({
  exerciseId: { type: Number, required: true, unique: true },
  exerciseName: { type: String, required: true },
  sportType: {
    type: String,
    required: true,
    enum: ["Calisthenics", "Body building", "Powerlifting"],
  },
  targetMuscle: { type: String, required: true },
});
const Exercise = mongoose.model<IExercise>(
  "Exercise",
  exerciseSchema,
  "Exercises"
);
export default Exercise;
