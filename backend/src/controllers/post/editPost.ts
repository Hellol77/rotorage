import { getAccessTokenToheader } from "./../../utils/getAccessTokenToHeader";
import { NextFunction, Request, Response } from "express";
import { getUserObjectId } from "../../utils/getUserObjectId";
import { Post } from "../../models/post";

export const editPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = getAccessTokenToheader(req);

  if (!accessToken) {
    return res.status(401).send("accessToken이 없습니다.");
  }
  const _id = await getUserObjectId(req, res, accessToken);
  if (!_id) {
    return res.status(401).send("Unauthorized. Fail to get user object id");
  }
  try {
    const title = req.body.title;
    const content = req.body.content;
    const postId = req.body.postId;
    const targetPost = await Post.findOne({ _id: postId });
    await Post.updateOne({ _id: postId }, { title, content });
    return res.status(200).send("Success edit post");
  } catch (err) {
    console.log("editPost", err);
    return res.status(400).send("Fail edit post");
  }
};
