require("dotenv").config();
import express from "express";
import serverless from "serverless-http";
import cors from "cors";

const mongoose = require("mongoose");

import { boardRouter } from "./routes/board";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

mongoose
  .connect(process.env.MONGO_DB_SRV)
  .catch((err: Error) => console.log(err))
  .finally(() => console.log("success"));

app.use("/board", boardRouter);
export const handler = serverless(app);