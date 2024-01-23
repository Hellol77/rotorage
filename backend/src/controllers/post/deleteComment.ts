import { Request, Response, NextFunction } from "express";
import { getAccessTokenToheader } from "../../utils/getAccessTokenToHeader";
import { getUserObjectId } from "../../utils/getUserObjectId";
import { Comment } from "../../models/comment";
import { Post } from "../../models/post";

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = getAccessTokenToheader(req);
  if (!accessToken) {
    return res.status(401).send("Unauthorized. Fail to get access token");
  }
  const _id = await getUserObjectId(req, res, accessToken);

  if (!_id) {
    return res.status(401).send("Unauthorized. Fail to get user object id");
  }
  try {
    const commentId = req.body.commentId;
    const deletedComemnt = await Comment.findByIdAndDelete({
      _id: commentId,
    }).lean();
    const targetPost = await Post.findByIdAndUpdate(
      { _id: deletedComemnt.post },
      { $pull: { comments: commentId } },
      { new: true }
    );
    await Post.updateOne(
      { _id: deletedComemnt.post },
      {
        $set: { commentsCount: targetPost?.comments.length },
      }
    );
    return res.status(200).send("Success delete comment");
  } catch (err) {
    console.log("deleteComment", err);
    return res.status(400).send("Fail delete comment");
  }
};
