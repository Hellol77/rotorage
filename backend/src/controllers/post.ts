import { Request, Response, NextFunction } from "express";

import { Post } from "../models/post";
import { User } from "../models/user";

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
  const userId = req.body.user;
  const user = await User.findOne({ userId });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const post = new Post({
    title,
    content,
    imageUrl,
    user: user._id,
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
  try {
    const page = Number(req.params.page);
    const limit = 12;

    const posts = await Post.find(
      {},
      { title: 1, content: 1, imageUrl: 1, _id: 0, user: 1 }
    )
      .populate({ path: "user", select: "userId nickname" })
      .sort({ _id: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
    console.log(posts.length);
    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error reading posts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getRecentPosts = async (
  req: Request<{ page: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = 4;

    const posts = await Post.find(
      {},
      { title: 1, content: 1, imageUrl: 1, _id: false, user: 1 }
    )
      .populate({
        path: "user",
        select: "userId nickname",
      })
      .sort({ _id: -1 })
      .limit(4)
      .exec();
    console.log("re", posts.length);
    console.log("recent", posts);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Recent Posts Internal Server Error " });
  }
};
