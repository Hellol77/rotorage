import { Request, Response, NextFunction } from "express";

import { Post } from "../../models/post";
import { getUserObjectId } from "../../utils/getUserObjectId";
import { getAccessTokenToheader } from "../../utils/getAccessTokenToHeader";

export const getRecentPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = getAccessTokenToheader(req);
    console.log("accessToken", accessToken);
    const _id = await getUserObjectId(req, res, accessToken);
    const limit = 4;
    const posts = await Post.find({}, {})
      .populate({
        path: "user",
      })
      .populate({
        path: "comments",
        populate: { path: "user" },
        options: { sort: { _id: -1 } },
      })
      .sort({ _id: -1 })
      .limit(limit)
      .lean();

    const postsWithLikeStatus = posts.map((post: any) => {
      const likers = post.likers || [];
      return {
        ...post,
        isLiked: _id
          ? likers.some((likerId: any) => likerId.equals(_id))
          : false,
      };
    });
    res.status(200).json(postsWithLikeStatus);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Recent Posts Internal Server Error " });
  }
};
