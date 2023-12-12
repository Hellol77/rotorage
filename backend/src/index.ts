require("dotenv").config();
import express from "express";
import serverless from "serverless-http";
import cors from "cors";

const mongoose = require("mongoose");

import { postRouter } from "./routes/post";
import { loginRouter } from "./routes/login";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

mongoose
  .connect(process.env.MONGO_DB_SRV)
  .then(() => console.log("success"))
  .catch((err: Error) => console.log(err));

app.use("/post", postRouter);
app.use("/login", loginRouter);
export const handler = serverless(app);
