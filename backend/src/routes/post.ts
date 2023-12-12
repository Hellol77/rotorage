import { Router } from "express";
import awsUpload from "../../config/multerConfig";

import { uploadPost, getPosts } from "../controllers/post";

const postRouter = Router();
postRouter.post("/", awsUpload.single("imgFile"), uploadPost);
postRouter.get("/:page", getPosts);

export { postRouter };
