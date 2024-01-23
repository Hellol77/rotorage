import { Request, Response } from "express";
import { getAccessTokenToheader } from "./../../utils/getAccessTokenToHeader";
import { getUserObjectId } from "../../utils/getUserObjectId";
import { Post } from "../../models/post";
import { User } from "../../models/user";
import { Comment } from "../../models/comment";
import s3 from "../../../config/s3Config";

export const deletePost = async (req: Request, res: Response) => {
  const accessToken = getAccessTokenToheader(req);
  if (!accessToken) {
    return res.status(401).send("accessToken이 없습니다.");
  }
  const _id = await getUserObjectId(req, res, accessToken);
  if (!_id) {
    return res.status(401).send("Unauthorized. Fail to get user object id");
  }
  try {
    const postId = req.body.postId;
    const deletedPost = await Post.findOneAndDelete({ _id: postId });

    await s3.deleteObject({
      Bucket: process.env.AWS_S3_POST_BUCKET,
      Key: deletedPost?.imageUrl.split(process.env.AWS_S3_URL as string)[1],
    });

    await User.updateOne(
      { _id },
      { $pull: { myPosts: postId, likedPosts: postId } }
    );
    await Comment.deleteMany({ post: postId });
    return res.status(200).send("Success delete post");
  } catch (err) {
    console.log("deletePost", err);
    return res.status(400).send("Fail delete post");
  }
};
