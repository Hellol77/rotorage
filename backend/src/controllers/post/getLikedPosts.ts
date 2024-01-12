import { Request, Response, NextFunction } from "express";
import { getUserObjectId } from "../../utils/getUserObjectId";
import { getAccessTokenToheader } from "../../utils/getAccessTokenToHeader";
import { Post } from "../../models/post";

export const getLikedPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = getAccessTokenToheader(req);
    const _id = await getUserObjectId(req, res, accessToken);

    const limit = 12;
    const page = Number(req.query.page);
    const posts = await Post.find({ likers: { $in: [_id] } }, {})
      .populate({
        path: "user",
        select: "userId nickname",
      })
      .sort({ _id: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();
    const myPostsWithLikeStatus = posts.map((post) => {
      return { ...post, isLiked: true };
    });
    return res.status(200).json(myPostsWithLikeStatus);
  } catch (err) {
    console.log("getLikedPosts", err);
    return res.status(400).send("좋아요한 게시글을 불러오는데 실패했습니다.");
  }
};
