import validator from "../middleWares/validator.js";
import authenticationToken from "../middleWares/authenticateToken.js";
import { uploadOptional } from "../middleWares/multerConfig.js";
import { Router } from "express";
//  Controller
import deletePost from "../controllers/posts/deletePost.controller.js";
import addPost from "../controllers/posts/addPost.controller.js";
import getAllPosts from "../controllers/posts/getAllPosts.controller.js";
//  Validation Schemas
import addPostValidationShema from "../validations/posts/addPostSchema.js";
import deletePostValidationShema from "../validations/posts/deletePostSchema.js";
import getAllPostsValidationSchema from "../validations/posts/getAllPostsSchema.js";
const postRouter = Router();
postRouter.use(authenticationToken);
postRouter.post(
  "/addPost",
  validator(addPostValidationShema, "body"),
  uploadOptional("imageUrl"),
  addPost
);
postRouter.delete(
  "/deletePost",
  validator(deletePostValidationShema, "body"),
  deletePost
);
postRouter.get(
  "/getAllPosts/:pageNumber",
  validator(getAllPostsValidationSchema, "params"),
  getAllPosts
);

export default postRouter;
