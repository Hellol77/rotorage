import { Request, Response, NextFunction } from "express";
import { Post } from "../../models/post";
import { getUserObjectId } from "../../utils/getUserObjectId";
import { getAccessTokenToheader } from "../../utils/getAccessTokenToHeader";

export const getUserPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = getAccessTokenToheader(req);
    const accessTokenUserId = await getUserObjectId(req, res, accessToken);

    const limit = 24;
    const page = Number(req.query.page);
    const userId = req.params.userId;

    // const user = await User.findOne({ _id }, { myPosts: 1 })
    //   .populate({
    //     path: "myPosts",
    //     options: {
    //       sort: { _id: -1 }, // createdAt 필드를 기준으로 내림차순 정렬
    //     },
    //   })
    //   .lean();
    console.log("userId", userId);
    const posts = await Post.find({ user: userId }, {})
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
    console.log("posts", posts);
    // const myPosts = user?.myPosts;
    // console.log("myPosts", myPosts);

    const myPostsWithLikeStatus = posts.map((post) => {
      const likers = post.likers || [];
      return {
        ...post,
        isLiked: userId
          ? likers.some((likerId: any) => likerId.equals(accessTokenUserId))
          : false,
      };
    });
    return res.status(200).json(myPostsWithLikeStatus);
  } catch (err) {
    console.log("getUserPosts", err);
    return res.status(400).send("자신의 게시글을 불러오는데 실패했습니다.");
  }
};
