import { Request, Response, NextFunction } from "express";

import { Post } from "../../models/post";
import { User } from "../../models/user";
import { getUserObjectId } from "../../utils/getUserObjectId";
import { getAccessTokenToheader } from "../../utils/getAccessTokenToHeader";

export const uploadPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = getAccessTokenToheader(req);
  if (!accessToken) {
    return res.status(401).send("you need to login (Don't have accesToken)");
  }
  const _id = await getUserObjectId(req, res, accessToken);
  if (!_id) {
    return res.status(401).send("Unauthorized. Fail to get user object id");
  }

  if (!req.file) {
    return res.status(400).send("이미지 파일이 존재하지 않습니다.");
  }
  const title = req.body.title;
  const content = req.body.content;
  const image = req.file as Express.MulterS3.File;
  const imageUrl = image.location;
  console.log("imageUrl", imageUrl);
  console.log("title", title);

  const user = await User.findOne({ _id });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const post = new Post({
    title,
    content,
    imageUrl,
    user: _id,
  });
  await User.updateOne({ _id }, { $push: { myPosts: post._id } });
  post
    .save()
    .then(() => {
      console.log("Create post");
      return res.status(200).send("db 저장 성공");
    })
    .catch((err: Error) => {
      console.log("post save err", err);
      return res.status(400).send("db 저장 실패");
    });
};
