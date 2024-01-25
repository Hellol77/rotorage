import { Request, Response } from "express";
import { getAccessTokenToheader } from "../../utils/getAccessTokenToHeader";
import { getUserObjectId } from "../../utils/getUserObjectId";
import { ReportedComment } from "../../models/repostComment";
import { User } from "../../models/user";

const limit = 24;

export const getReportedComments = async (req: Request, res: Response) => {
  try {
    const page = Number(req.params.page);
    const accessToken = getAccessTokenToheader(req);
    const _id = await getUserObjectId(req, res, accessToken);
    const adminUser = await User.findOne({ _id }).lean();
    if (adminUser?.type !== "admin") {
      return res.status(401).send("Unauthorized. Fail to get access token");
    }
    const repostedComments = await ReportedComment.find({})
      .populate({
        path: "comment",
        populate: { path: "user" },
      })
      .sort({ reportCount: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();
    const comments = repostedComments.map((post: any) => post.comment);

    return res.status(200).send(comments);
  } catch (err) {
    console.log("getCommentReport", err);
    return res.status(400).send("Fail get comment report");
  }
};
