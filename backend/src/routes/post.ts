import { Router } from "express";
import awsUpload from "../../config/multerConfig";

import { uploadPost } from "../controllers/post/uploadPost";
import { getPosts } from "../controllers/post/getPosts";
import { getRecentPosts } from "../controllers/post/getRecentPosts";
import { likePost } from "../controllers/post/likePost";
import { getUserPosts } from "../controllers/post/getUserPosts";
import { getLikedPosts } from "../controllers/post/getLikedPosts";
import { dislikePost } from "../controllers/post/dislikePost";

const postRouter = Router();
postRouter.post("/", awsUpload.single("imageUrl"), uploadPost);
postRouter.get("/page/:page", getPosts);
postRouter.get("/recent", getRecentPosts);
postRouter.post("/like", likePost);
postRouter.get("/user/:userId", getUserPosts);
postRouter.get("/like", getLikedPosts);
postRouter.post("/dislike", dislikePost);
export { postRouter };
