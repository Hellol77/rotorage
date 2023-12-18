require("dotenv").config();
import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import cookieParser from "cookie-parser";

const mongoose = require("mongoose");

import { postRouter } from "./routes/post";
import { kakaoAuthRouter } from "./routes/kakaoAuth";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

mongoose
  .connect(process.env.MONGO_DB_SRV)
  .then(() => console.log("mongodb connect"))
  .catch((err: Error) => console.log(err));

app.use(cookieParser());
app.use(express.json());
app.use("/post", postRouter);
app.use("/auth/kakao", kakaoAuthRouter);
export const handler = serverless(app);
