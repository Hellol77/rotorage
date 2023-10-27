import express from "express";
import awsUpload from "../config/multerConfig";
const path = require("path");
const boardController = require("../controllers/board.ts");

const router = express.Router();

router.post("/", awsUpload.single("imgFile"), boardController.postAddBoard);

router.get("/", (req, res, next) => {
  console.log("get");
});

module.exports = router;
