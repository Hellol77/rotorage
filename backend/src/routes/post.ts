import { Router } from "express";
import awsUpload from "../../config/multerConfig";

import {
  uploadPost,
  getPosts,
  getRecentPosts,
  likePost,
} from "../controllers/post/post";

const postRouter = Router();
postRouter.post("/", awsUpload.single("imgFile"), uploadPost);
postRouter.get("/page/:page", getPosts);
postRouter.get("/recent", getRecentPosts);
postRouter.post("/like", likePost);
export { postRouter };
