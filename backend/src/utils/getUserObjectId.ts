import axios from "axios";
import { Request, Response } from "express";
import { User } from "../models/user";

export const getUserObjectId = async (
  req: Request,
  res: Response,
  accessToken: string | null
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
    ).lean();
    return userData?._id;
  } catch (err) {
    console.log("getUserObjectId error", err);
    return null;
  }
};
