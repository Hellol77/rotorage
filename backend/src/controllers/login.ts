import { Request, Response } from "express";
import { User } from "../models/user";
import axios from "axios";

export const getKakaoLogin = async (req: Request, res: Response) => {
  const code = req.query.code;
  console.log("code", code);
  try {
    const getLoginAccessToken = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      {},
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        params: {
          grant_type: "authorization_code",
          client_id: process.env.KAKAO_REST_API_KEY,
          client_secret: process.env.KAKAO_CLIENT_SECRET,
          redirect_uri: process.env.KAKAO_REDIRECT_URI,
          code,
        },
      }
    );
    console.log("getLoginAccessToken", getLoginAccessToken.data);
    console.log("token", getLoginAccessToken.data.access_token);

    res.cookie("refreshToken", getLoginAccessToken.data.refresh_token, {
      sameSite: "none",
      domain: "localhost",
      secure: true,
      httpOnly: true,
    });

    console.log("res header", res.getHeaders()["set-cookie"]);
    const getUserInfo = await axios.post(
      "https://kapi.kakao.com/v2/user/me",
      {},
      {
        headers: {
          Authorization: "Bearer " + getLoginAccessToken.data.access_token,
          "Content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("info id", getUserInfo.data.id);
    const userExists = await User.exists({ id: getUserInfo.data.id });
    if (!userExists) {
      const newUser = new User({
        id: getUserInfo.data.id,
        nickname: getUserInfo.data.properties.nickname,
      });
      newUser.save().then(() => {
        console.log("create new User");
      });
    }
    console.log("refresh token", getLoginAccessToken.data.refresh_token);
    console.log("info nickname", getUserInfo.data.properties.nickname);
    return res.status(200).send(getUserInfo.data);
  } catch (err) {
    console.log("error");
    res.status(401).send("Unauthorized");
  }
};
