require("dotenv").config();

const express = require("express");
const serverless = require("serverless-http");

const app = express();

app.use((req, res, next) => {
  console.log("wwsdsw");
});

const handler = serverless(app);
module.exports.handler = async (event, context) => {
  // you can do other things here
  const result = await handler(event, context);
  // and here
  return result;
};
app.listen(8080);
