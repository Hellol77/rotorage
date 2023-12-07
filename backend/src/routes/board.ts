import express from "express";
import awsUpload from "../../config/multerConfig";


import { postAddBoard, getBoard } from "../controllers/board";

const boardRouter = express.Router();
boardRouter.post("/", awsUpload.single("imgFile"), postAddBoard);
boardRouter.get("/:page", getBoard);

export { boardRouter };
