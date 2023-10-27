import express from "express";
import awsUpload from "../config/multerConfig";
const boardController = require("../controllers/board.ts");

const router = express.Router();

router.post("/", awsUpload.single("imgFile"), boardController.postAddBoard);

router.get("/", boardController.getBoard);

module.exports = router;
