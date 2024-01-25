import { Request, Response } from "express";
import { ReportedComment } from "../../models/repostComment";

import { getUserObjectId } from "../../utils/getUserObjectId";
import { getAccessTokenToheader } from "../../utils/getAccessTokenToHeader";

export const reportComment = async (req: Request, res: Response) => {
  const accessToken = getAccessTokenToheader(req);

  if (!accessToken) {
    return res.status(401).send("accessToken이 없습니다.");
  }
  const _id = await getUserObjectId(req, res, accessToken);
  if (!_id) {
    return res.status(401).send("Unauthorized. Fail to get user object id");
  }

  try {
    const commentId = req.body.commentId;
    const report = new ReportedComment({
      reportUser: [_id],
      comment: commentId,
    });
    const isExistReportedComment = await ReportedComment.exists({
      comment: commentId,
    });
    if (isExistReportedComment) {
      const alreadyReporteComment = await ReportedComment.findOneAndUpdate(
        {
          comment: commentId,
        },
        { $addToSet: { reportUser: _id } },
        { new: true }
      );
      await ReportedComment?.updateOne(
        {
          comment: commentId,
        },
        { $set: { reportCount: alreadyReporteComment?.reportUser.length } },
        { new: true }
      );
      return res.status(200).send("Success report post");
    }

    await report.save();
    return res.status(200).send("Success report post");
  } catch (err) {}
};
