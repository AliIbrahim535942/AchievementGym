import Post from "../../models/post.js";
import { responseHandler } from "../../utils/responseHandler.js";
import { getNextSequence } from "../../models/counter.js";
async function addPost(req, res, next) {
  const { content, imageUrl } = req.body;
  const user = req.user;
  try {
    if (user.accountType != "Coach") {
      return responseHandler.error(res, "only Coachs can post.", 403);
    }
    const newPost = await Post.create({
      postId: await getNextSequence("Post"),
      date: new Date().toISOString().split("T")[0],
      coachId: user.coachId,
    });
    if (content) newPost.content = content;
    if (imageUrl) newPost.imageUrl = imageUrl;
    await newPost.save();
  } catch (error) {
    return responseHandler.error(res, "server error", 500, {
      error: error.message,
    });
  }
}

export default addPost;
