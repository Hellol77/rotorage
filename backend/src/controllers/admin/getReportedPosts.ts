import { Request, Response } from "express";
import { getAccessTokenToheader } from "../../utils/getAccessTokenToHeader";
import { getUserObjectId } from "../../utils/getUserObjectId";
import { User } from "../../models/user";
import { ReportedPost } from "../../models/reportPost";

const limit = 24;

export const getReportedPosts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.params.page);
    const accessToken = getAccessTokenToheader(req);
    const _id = await getUserObjectId(req, res, accessToken);
    const adminUser = await User.findOne({ _id }).lean();
    if (adminUser?.type !== "admin") {
      return res.status(401).send("Unauthorized. Fail to get access token");
    }
    const repostedPosts = await ReportedPost.find({}, { post: 1 })
      .populate({
        path: "post",
        populate: { path: "user comments" },
      })
      .sort({ reportCount: -1 })
      .limit(limit)
      .skip((page - 1) * limit);
    console.log("repostedPosts", repostedPosts);
    const posts = repostedPosts.map((post: any) => post.post);
    console.log("repostedPost", posts);
    return res.status(200).send(posts);
  } catch (err) {
    console.log("repostedPost", err);
    return res.status(400).send("Fail get comment report");
  }
};
