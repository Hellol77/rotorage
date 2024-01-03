import axios from "axios";
import { Request, Response } from "express";
import { User } from "../models/user";

export const getUserObjectId = async (
  req: Request,
  res: Response,
  accessToken: string
) => {
  try {
    const profileInfo = await axios.get(
      "https://kapi.kakao.com/v1/user/access_token_info",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const userData = await User.findOne(
      { userId: profileInfo.data.id },
      { _id: 1 }
    );

    return userData?._id;
  } catch (err) {
    return;
  }
};
