import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import cookieParser from "cookie-parser";

const mongoose = require("mongoose");

import { postRouter } from "./routes/post";
import { kakaoAuthRouter } from "./routes/kakaoAuth";
import { userRouter } from "./routes/user";
import { adminRouter } from "./routes/admin";

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
app.use("/user", userRouter);
app.use("/admin", adminRouter);
export const handler = serverless(app);
