import { Request, Response, NextFunction } from "express";

import { Post } from "../../models/post";
import { getUserObjectId } from "../../utils/getUserObjectId";
import { getAccessTokenToheader } from "../../utils/getAccessTokenToHeader";
import { User } from "../../models/user";

export const dislikePost = async (req: Request, res: Response) => {
  const accessToken = getAccessTokenToheader(req);

  console.log("accessToken", accessToken);
  if (!accessToken) {
    res.status(401).send("you need to login (Don't have accesToken)");
  }

  const _id = await getUserObjectId(req, res, accessToken);
  console.log("_id", _id);
  if (!_id) {
    return res.status(401).send("Unauthorized. Fail to get user object id");
  }
  try {
    const postId = req.body._id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const isLiked = post.likers.includes(_id);

    if (isLiked) {
      await User.updateOne({ _id: _id }, { $pull: { likedPosts: postId } });
    } else if (!isLiked) {
      await User.updateOne({ _id: _id }, { $push: { likedPosts: postId } });
    }

    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      {
        $pull: { likers: _id }, // likers 배열에서 userId 제거
      },
      { new: true }
    );
    await Post.updateOne(
      { _id: postId },
      {
        $set: {
          likeCount: updatedPost?.likers.length,
        }, // likeCount 1 증가
      },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(400).json({ error: "Failed to toggle like status" });
    }
    const likeStatus = isLiked;
    console.log(likeStatus);
    return res.status(200).send({ likeStatus });
  } catch (err) {
    console.log(err);
    return res.status(400).send("failed to like post");
  }
};
