import { Router } from "express";
import { uploadOptional } from "../middleWares/multerConfig.js";
import validator from "../middleWares/validator.js";
import authenticationToken from "../middleWares/authenticateToken.js";
//controllers
import updatePost from "../controllers/posts/updatePost.js";
import deletePost from "../controllers/posts/deletePost.js";
import addPost from "../controllers/posts/addPost.js";
import getAllPosts from "../controllers/posts/getAllPosts.js";
//vatidation schemas
import addPostValidationShema from "../validations/users/addPostSchema.js";
import deletePostValidationShema from "../validations/users/deletePostSchema.js";
import getAllPostsValidationSchema from "../validations/users/getAllPostsSchema.js";
import updatePostValidationShema from "../validations/users/updatePostSchema.js";
const postRouter = Router();
postRouter.use(authenticationToken);
postRouter.post(
  "/addPost",
  validator(addPostValidationShema),
  uploadOptional("imageUrl"),
  addPost
);
postRouter.delete(
  "/deletePost",
  validator(deletePostValidationShema),
  deletePost
);
postRouter.get(
  "/getAllPosts",
  validator(getAllPostsValidationSchema),
  getAllPosts
);
postRouter.put(
  "/updatePost",
  validator(updatePostValidationShema),
  uploadOptional("imageUrl"),
  updatePost
);

export default postRouter;
