import { Request, Response, NextFunction } from "express";

import { Post } from "../models/post";

export const uploadPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return res.status(400).send("file");
  }
  const title = req.body.title;
  const content = req.body.content;
  const image = req.file as Express.MulterS3.File;
  const imageUrl = image.location;
  const post = new Post({
    title,
    content,
    imageUrl,
  });

  post
    .save()
    .then(() => {
      console.log("Create post");
      return res.status(200).send("db 저장 성공");
    })
    .catch((err: Error) => {
      return res.status(400).send("db 저장 실패");
    });
};

export const getPosts = async (
  req: Request<{ page: string }>,
  res: Response,
  next: NextFunction
) => {
  const page = Number(req.params.page);
  const limit = 12;
  Post.find({}, { title: 1, content: 1, imageUrl: 1, _id: 0 })
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
