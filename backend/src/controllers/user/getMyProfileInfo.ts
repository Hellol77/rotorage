import axios from "axios";
import { Request, Response } from "express";
import { User } from "../../models/user";

export const getMyProfileInfo = async (req: Request, res: Response) => {
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
    const userData = await User.findOne({ userId: profileInfo.data.id }).lean();

    res.status(200).send(userData);
  } catch (err) {
    console.log("err", err);
    res.status(401).send("Unauthorized");
  }
};
