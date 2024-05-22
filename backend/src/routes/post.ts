import { Router } from "express";
import awsUpload from "../../config/multerConfig";

import { uploadPost } from "../controllers/post/uploadPost";
import { getPosts } from "../controllers/post/getPosts";
import { getRecentPosts } from "../controllers/post/getRecentPosts";
import { likePost } from "../controllers/post/likePost";
import { getUserPosts } from "../controllers/post/getUserPosts";
import { getLikedPosts } from "../controllers/post/getLikedPosts";
import { dislikePost } from "../controllers/post/dislikePost";
import { addComment } from "../controllers/post/addComment";
import { deletePost } from "../controllers/post/deletePost";
import { deleteComment } from "../controllers/post/deleteComment";
import { editPost } from "../controllers/post/editPost";
import { reportPost } from "../controllers/post/reportPost";
import { reportComment } from "../controllers/post/reportComment";
import { getLikedRankPosts } from "../controllers/post/getLikedRankPosts";

const postRouter = Router();
postRouter.post("/", awsUpload.single("imageUrl"), uploadPost);
postRouter.get("/page/:page", getPosts);
postRouter.get("/recent", getRecentPosts);
postRouter.post("/like", likePost);
postRouter.get("/user/:userId", getUserPosts);
postRouter.get("/like", getLikedPosts);
postRouter.post("/dislike", dislikePost);
postRouter.post("/comment", addComment);
postRouter.delete("/", deletePost);
postRouter.delete("/comment", deleteComment);
postRouter.patch("/", editPost);
postRouter.post("/report", reportPost);
postRouter.post("/comment/report", reportComment);
postRouter.get("/top-liked", getLikedRankPosts);

export { postRouter };
