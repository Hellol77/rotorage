import { Request, Response, NextFunction } from "express";

import { Post } from "../../models/post";
import { getUserObjectId } from "../../utils/getUserObjectId";
import { getAccessTokenToheader } from "../../utils/getAccessTokenToHeader";

export const getPosts = async (
  req: Request<{ page: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = getAccessTokenToheader(req);
    const _id = await getUserObjectId(req, res, accessToken);
    const page = Number(req.params.page);
    const limit = 24;

    const posts = await Post.find({}, {})
      .populate({ path: "user" })
      .populate({
        path: "comments",
        populate: { path: "user" },
        options: { sort: { _id: -1 } },
      })
      .sort({ _id: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
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
    return res.status(200).json(postsWithLikeStatus);
  } catch (error) {
    console.error("Error reading posts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
