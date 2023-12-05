import express from "express";
import awsUpload from "../../config/multerConfig";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
import { postAddBoard, getBoard } from "../controllers/board";

const boardRouter = express.Router();
boardRouter.use(cors(corsOptions));
boardRouter.post("/", awsUpload.single("imgFile"), postAddBoard);
boardRouter.get("/:page", getBoard);

export { boardRouter };
