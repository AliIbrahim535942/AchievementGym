import mongoose, { Schema } from "mongoose";

const passwordResetTokenSchema = new Schema({
  userId: {
    type: Number,
    required: true,
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 900 },
});

const PasswordResetToken = mongoose.model(
  "PasswordResetToken",
  passwordResetTokenSchema,
  "PasswordResetTokens"
);
export default PasswordResetToken;
