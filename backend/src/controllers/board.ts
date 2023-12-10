import { Request, Response, NextFunction } from "express";

import { Board } from "../models/board";

export const postAddBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.password == "") {
    return res.status(400).send("password");
  }
  if (!req.file) {
    return res.status(400).send("file");
  }
  const title = req.body.title;
  const content = req.body.content;
  const image = req.file as Express.MulterS3.File;
  const password = req.body.password;
  const imageUrl = image.location;
  const board = new Board({
    title,
    content,
    imageUrl,
    password,
  });

  board
    .save()
    .then(() => {
      console.log("Create board");
      return res.status(200).send("db 저장 성공");
    })
    .catch((err: Error) => {
      return res.status(400).send("db 저장 실패");
    });
};

export const getBoard = async (
  req: Request<{ page: string }>,
  res: Response,
  next: NextFunction
) => {
  const page = Number(req.params.page);
  const limit = 12;
  Board.find({}, { title: 1, content: 1, imageUrl: 1, _id: 0 })
    .sort({ _id: -1 })
    .limit(limit)
    .skip((page - 1) * limit)
    .exec()
    .then((posts) => {
      return res.status(200).send(posts);
    })
    .catch((err) => {
      return res.status(400).send("Can't read posts");
    });
};
