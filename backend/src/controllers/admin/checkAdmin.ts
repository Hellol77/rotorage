import { Request, Response } from "express";
import { getAccessTokenToheader } from "../../utils/getAccessTokenToHeader";
import { getUserObjectId } from "../../utils/getUserObjectId";
import { User } from "../../models/user";
export const checkAdmin = async (req: Request, res: Response) => {
  const accessToken = getAccessTokenToheader(req);
  if (!accessToken) {
    return res.status(401).send("Unauthorized. Fail to get access token");
  }
  const _id = await getUserObjectId(req, res, accessToken);

  if (!_id) {
    return res.status(401).send("Unauthorized. Fail to get user object id");
  }
  try {
    const user = await User.findOne({ _id }).lean();
    if (user?.type === "admin") {
      return res.status(200).send("admin");
    }
    return res.status(401).send("user");
  } catch (err) {
    return res.status(400).send("Fail check admin");
  }
};
