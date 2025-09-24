import mongoose, { Schema } from "mongoose";
const postSchema = new Schema({
  postId: { type: Number, required: true, unique: true },
  content: { type: String, required: false },
  imageUrl: { type: String, required: false },
  coachId: { type: Number, required: true, ref: "Coach" },
  date: { type: Date, required: true },
});
const Post = mongoose.model("Post", postSchema, "Posts");
export default Post;
