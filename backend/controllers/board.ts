import { Request, Response, NextFunction } from "express";

import { Board } from "../models/board";

exports.postAddBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) return res.status(400).send("파일 전송 실패");
  const title = req.body.title;
  const content = req.body.content;
  const image = req.file as Express.MulterS3.File;
  console.log(image.location);
  const imageUrl = image.location;
  const board = new Board({
    title,
    content,
    imageUrl,
  });

  board
    .save()
    .then(() => {
      console.log("Create board");
      res.status(200).send("db 저장 성공");
    })
    .catch((err: Error) => res.status(400).send("db 저장 실패"));
};

exports.getBoard = async (req: Request, res: Response, next: NextFunction) => {
  const posts = await Board.find({});
  return res.status(200).send(posts);
};
