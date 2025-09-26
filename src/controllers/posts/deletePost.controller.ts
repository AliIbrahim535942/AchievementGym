import Post from "../../models/post.js";
import { responseHandler } from "../../utils/responseHandler.js";
import { Request,Response, NextFunction } from "express";
async function deletePost(
  req: Request<{ postId: number }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { postId } = req.body;
  if (!req.user) {
    return responseHandler.error(res, "forbidden", 403);
  }
  const { coachId } = req.user;
  try {
    if (req.user.accountType !== "Coach") {
      return responseHandler.error(res, "you aren't a coach.", 403);
    }
    const post = await Post.findOne({ postId });
    if (!post) {
      return responseHandler.notFound(res, "post not found");
    }
    if (post.coachId !== coachId) {
      return responseHandler.error(res, "you can only delete your posts.", 403);
    }
    await Post.findOneAndDelete({ postId });
    return responseHandler.success(res, "post deleted successfully");
  } catch (error: unknown) {
    if (error instanceof Error) {
      return responseHandler.error(res, "server error", 500, {
        error: error.message,
      });
    }
    return responseHandler.error(res, "server error", 500);
  }
}
export default deletePost;
