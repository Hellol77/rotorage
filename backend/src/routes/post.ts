import { Router } from "express";
import awsUpload from "../../config/multerConfig";

import { uploadPost } from "../controllers/post/uploadPost";
import { getPosts } from "../controllers/post/getPosts";
import { getRecentPosts } from "../controllers/post/getRecentPosts";
import { likePost } from "../controllers/post/likePost";

const postRouter = Router();
postRouter.post("/", awsUpload.single("imgFile"), uploadPost);
postRouter.get("/page/:page", getPosts);
postRouter.get("/recent", getRecentPosts);
postRouter.post("/like", likePost);
export { postRouter };
