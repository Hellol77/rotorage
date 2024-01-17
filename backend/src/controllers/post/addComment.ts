import { Request, Response, NextFunction } from "express";

import { Post } from "../../models/post";
import { Comment } from "../../models/comment";
import { getAccessTokenToheader } from "../../utils/getAccessTokenToHeader";
import { getUserObjectId } from "../../utils/getUserObjectId";

export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = getAccessTokenToheader(req);
    const _id = await getUserObjectId(req, res, accessToken);

    
  } catch (err) {}
};
