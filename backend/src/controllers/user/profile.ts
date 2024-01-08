import { getAccessTokenToheader } from "./../../utils/getAccessTokenToHeader";
import axios from "axios";
import { Request, Response } from "express";
import { User } from "../../models/user";

export const getProfileInfo = async (req: Request, res: Response) => {
  const accessToken = req.body.accessToken;
  if (!accessToken) {
    console.log("token", accessToken);
    return res.status(400).send("accessToken이 없습니다.");
  }
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
      { _id: 0 }
    );
    console.log("profile", profileInfo.data.id);
    res.status(200).send(userData);
  } catch (err) {
    console.log("proerr");
    res.redirect("http://localhost:3000/login");
    res.status(401).send("Unauthorized");
  }
};

export const editProfileInfo = async (req: Request, res: Response) => {
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
    await User.findOneAndUpdate(
      { userId: profileInfo.data.id },
      {
        nickname: newNickname,
        introduce: newIntroduce,
      }
    );
    res.status(200).send("Success Edit Profile");
  } catch (err) {
    res.status(401).send("Fail edit profile");
  }
};
