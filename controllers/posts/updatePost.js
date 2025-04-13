import Post from "../../models/post.js";
import { responseHandler } from "../../utils/responseHandler.js";
import deleteMedia from "../../utils/deleteMedia.js";
async function updatePost(req, res, next) {
  const { content, imageUrl, postId = 0 } = req.body;
  const { coachId } = req.user;
  try {
    if (req.user.accountType != "Coach") {
      return responseHandler.error(res, "you aren't a coach.", 403);
    }
    const post = await Post.findOne({ postId });
    if (!post) {
      return responseHandler.notFound(res, "post not found");
    }
    if (post.coachId != coachId) {
      return responseHandler.error(res, "you can only update your posts.", 403);
    }
    const updatedFields = {};
    if (content) updatedFields.content = content;
    if (imageUrl) {
      updatedFields.imageUrl = imageUrl;
      deleteMedia(post.imageUrl);
    }
    const updatedPost = await Post.findOneAndUpdate(
      { postId },
      { $set: updatedFields }
    );
  } catch (error) {
    return responseHandler.error(res, "server error", 500, {
      error: error.message,
    });
  }
}
export default updatePost;
