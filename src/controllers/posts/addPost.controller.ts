import Post from "../../models/post.js";
import { responseHandler } from "../../utils/responseHandler.js";
import { getNextSequence } from "../../models/counter.js";
import { Response, NextFunction, Request } from "express";

async function addPost(
  req: Request<{ content: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { content } = req.body;
  const user = req.user;
  if (!user) {
    return responseHandler.error(res, "forbidden", 403);
  }
  try {
    if (user.accountType !== "Coach") {
      return responseHandler.error(res, "only Coachs can post.", 403);
    }
    const newPost = await Post.create({
      postId: await getNextSequence("Post"),
      date: new Date(),
      coachId: user.coachId,
    });
    if (content) newPost.content = content;
    if (req.file) newPost.imageUrl = req.file.path;
    await newPost.save();
    return responseHandler.success(res, "post created successfully", {
      postId: newPost.postId,
      date: newPost.date,
      content: newPost.content,
      imageUrl: newPost.imageUrl,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return responseHandler.error(res, "server error", 500, {
        error: error.message,
      });
    }
    return responseHandler.error(res, "server error", 500);
  }
}

export default addPost;
