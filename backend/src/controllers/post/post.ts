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
  if (!req.file) {
    return res.status(400).send("file");
  }
  const title = req.body.title;
  const content = req.body.content;
  const image = req.file as Express.MulterS3.File;
  const imageUrl = image.location;
  const userId = req.body.user;
  const user = await User.findOne({ userId });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const post = new Post({
    title,
    content,
    imageUrl,
    user: user._id,
  });

  post
    .save()
    .then(() => {
      console.log("Create post");
      return res.status(200).send("db 저장 성공");
    })
    .catch((err: Error) => {
      return res.status(400).send("db 저장 실패");
    });
};

export const getPosts = async (
  req: Request<{ page: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = getAccessTokenToheader(req);
    const _id = await getUserObjectId(req, res, accessToken);
    const page = Number(req.params.page);
    const limit = 12;

    const posts = await Post.find({}, {})
      .populate({ path: "user", select: "userId nickname" })
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
        select: "userId nickname",
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
    console.log(err);
    return res
      .status(500)
      .json({ error: "Recent Posts Internal Server Error " });
  }
};

// export const deletePost = async (req: Request, res: Response) => {
// try{

// }

// };

export const likePost = async (req: Request, res: Response) => {
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

    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      isLiked
        ? {
            $pull: { likers: _id }, // likers 배열에서 userId 제거
            $inc: { likeCount: -1 }, // likeCount 1 감소
          }
        : {
            $push: { likers: _id }, // likers 배열에 userId 추가
            $inc: { likeCount: 1 }, // likeCount 1 증가
          },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(400).json({ error: "Failed to toggle like status" });
    }
    const likeStatus = isLiked;

    return res.status(200).send({ likeStatus });
  } catch (err) {}
};
