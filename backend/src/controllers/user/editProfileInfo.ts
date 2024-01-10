import { getAccessTokenToheader } from "./../../utils/getAccessTokenToHeader";
import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { User } from "../../models/user";
import { MongoError } from "mongodb";

export const editProfileInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = getAccessTokenToheader(req);
  if (!accessToken) {
    res.status(401).send("accessToken이 없습니다.");
  }
  try {
    const newNickname = req.body.nickname;
    const newIntroduce = req.body.introduce;
    const profileInfo = await axios.get(
      "https://kapi.kakao.com/v1/user/access_token_info",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const userData = await User.findOneAndUpdate(
      { userId: profileInfo.data.id },
      {
        nickname: newNickname,
        introduce: newIntroduce,
      }
    );
    console.log("userData", userData);
    res.status(200).send("Success Edit Profile");
  } catch (err) {
    console.log("err", err instanceof MongoError);
    if (err instanceof MongoError && err.code === 11000) {
      return res.status(409).send("이미 존재하는 닉네임입니다.");
    }
    return res.status(400).send("Fail edit profile");
  }
};
