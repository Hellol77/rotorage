import { Request, Response } from "express";
import { ReportedPost } from "./../../models/reportPost";

import { getUserObjectId } from "../../utils/getUserObjectId";
import { getAccessTokenToheader } from "../../utils/getAccessTokenToHeader";

export const reportPost = async (req: Request, res: Response) => {
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
    const report = new ReportedPost({
      reportUser: [_id],
      post: postId,
    });
    const isExistReportedPost = await ReportedPost.exists({
      post: postId,
    });
    if (isExistReportedPost) {
      const alreadyReportedPost = await ReportedPost.findOneAndUpdate(
        {
          post: postId,
        },
        { $addToSet: { reportUser: _id } },
        { new: true }
      );
      await ReportedPost?.updateOne(
        { post: postId },
        { $set: { reportCount: alreadyReportedPost?.reportUser.length } },
        { new: true }
      );
      return res.status(200).send("Success report post");
    }

    await report.save();
    return res.status(200).send("Success report post");
  } catch (err) {}
};
