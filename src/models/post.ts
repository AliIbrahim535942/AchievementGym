import mongoose, { Schema, Document } from "mongoose";
interface IPost extends Document {
  postId: number;
  content: string;
  imageUrl: string;
  coachId: number;
  date: Date;
}
const postSchema = new Schema<IPost>({
  postId: { type: Number, required: true, unique: true },
  content: { type: String, required: false },
  imageUrl: { type: String, required: false },
  coachId: { type: Number, required: true, ref: "Coach" },
  date: { type: Date, required: true },
});
const Post = mongoose.model<IPost>("Post", postSchema, "Posts");
export default Post;
