import express from "express";
import awsUpload from "../config/multerConfig";

import cors from "cors";

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const boardController = require("../controllers/board.ts");

const router = express.Router();
router.use(cors(corsOptions));
router.post("/", awsUpload.single("imgFile"), boardController.postAddBoard);

router.get("/:page", boardController.getBoard);

module.exports = router;
