import Post from "../../models/post.js";
import { responseHandler } from "../../utils/responseHandler.js";
async function deletePost(req, res, next) {
  const { postId } = req.body;
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
      return responseHandler.error(res, "you can only delete your posts.", 403);
    }
    await post.remove();
  } catch (error) {
    return responseHandler.error(res, "server error", 500, {
      error: error.message,
    });
  }
}
export default deletePost;
