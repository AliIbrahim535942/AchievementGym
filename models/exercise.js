import mongoose, { Schema } from "mongoose";
const exerciseSchema = new Schema({
  exerciseId: { type: Number, required: true, unique: true },
  exerciseName: { type: String, required: true },
  sportType: {
    type: String,
    required: true,
    enum: ["Calisthenics", "Body building", "Powerlifting"],
  },
  targetMuscle: { type: String, required: true },
});
const Exercise = mongoose.model("Exercise", exerciseSchema, "Exercises");
export default Exercise;
