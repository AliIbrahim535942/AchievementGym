import mongoose, { Schema, Document } from "mongoose";
interface IPasswordResetTokenSchema extends Document {
  userId: number;
  token: string;
  createdAt: Date;
}
const passwordResetTokenSchema = new Schema<IPasswordResetTokenSchema>({
  userId: {
    type: Number,
    required: true,
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 900 },
});

const PasswordResetToken = mongoose.model<IPasswordResetTokenSchema>(
  "PasswordResetToken",
  passwordResetTokenSchema,
  "PasswordResetTokens"
);
export default PasswordResetToken;
