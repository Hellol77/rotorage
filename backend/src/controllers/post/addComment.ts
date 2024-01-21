import { Request, Response, NextFunction } from "express";

import { Post } from "../../models/post";
import { Comment } from "../../models/comment";
import { getAccessTokenToheader } from "../../utils/getAccessTokenToHeader";
import { getUserObjectId } from "../../utils/getUserObjectId";

export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = getAccessTokenToheader(req);
    const _id = await getUserObjectId(req, res, accessToken);
    if (!_id) {
      return res.status(401).send("Unauthorized. Fail to get user object id");
    }
    const postId = req.body.postId;
    const comment = new Comment(
      {
        user: _id,
        content: req.body.content,
        createdAt: new Date(),
      },
      { versionKey: false }
    );
    await Post.updateOne({ _id: postId }, { $push: { comments: comment._id } });
    await comment.save();
    return res.status(200).send("Success add comment");
  } catch (err) {
    return res.status(400).send("Fail add comment");
  }
};
