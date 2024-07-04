import { User } from "../../models/user";
import { getAccessTokenToheader } from "./../../utils/getAccessTokenToHeader";
import { Request, Response } from "express";
import { getUserObjectId } from "../../utils/getUserObjectId";
import axios from "axios";
import { Post } from "../../models/post";
import { Comment } from "../../models/comment";
import { ReportedComment } from "../../models/repostComment";
import { ReportedPost } from "../../models/reportPost";

export const deleteUser = async (req: Request, res: Response) => {
  const accessToken = getAccessTokenToheader(req);
  if (!accessToken) {
    return res.status(401).send("accessToken이 없습니다.");
  }
  const _id = await getUserObjectId(req, res, accessToken);
  if (!_id) {
    return res.status(401).send("Unauthorized. Fail to get user object id");
  }
  const kakaoId = await User.findOne({ _id }, { userId: 1 }).lean();
  try {
    const deleteUserData = await axios.post(
      "https://kapi.kakao.com/v1/user/unlink",
      {
        target_id_type: "user_id",
        target_id: kakaoId,
      },
      {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    await User.deleteOne({ userId: deleteUserData.data.id });
    await Post.deleteMany({ user: _id });
    await Comment.deleteMany({ user: _id });
    await ReportedComment.deleteMany({ reportUser: _id });
    await ReportedPost.deleteMany({ reportUser: _id });
    return res.status(200).send("Success Delete User");
  } catch (err) {
    return res.status(400).send("Fail to delete user");
  }
};
