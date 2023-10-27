const { S3 } = require("@aws-sdk/client-s3");

require("dotenv").config();
import express from "express";
// import { Handler } from "aws-lambda";

const serverless = require("serverless-http");

const mongoose = require("mongoose");
const port = process.env.APP_PORT || 8080;

const boardRouter = require("./routes/board");
// const serverParams = { port };
const app = express();

mongoose
  .connect(process.env.MONGO_DB_SRV)
  .then(() => {
    app.listen(port);
  })
  .catch((err: Error) => console.log(err))
  .finally(() => console.log("success"));

const handler = serverless(app);
module.exports.handler = async (event: any, context: any) => {
  // you can do other things here
  await mongoose
    .connect(process.env.MONGO_DB_SRV)
    .then(async () => {
      const result = await handler(event, context);

      return result;
    })
    .catch(() => {
      console.log("err");
    });
  // and here
};

app.use("/board", boardRouter);
