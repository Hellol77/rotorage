import { setRefreshTokenCookie } from "./../utils/setRefreshToken";
import { Request, Response } from "express";
import { User } from "../models/user";
import axios from "axios";

export const getKakaoLogin = async (req: Request, res: Response) => {
  const code = req.query.code;
  try {
    const getLoginInfo = await axios.post(
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
    setRefreshTokenCookie(res, getLoginInfo.data.refresh_token);

    const getUserInfo = await axios.post(
      "https://kapi.kakao.com/v2/user/me",
      {},
      {
        headers: {
          Authorization: "Bearer " + getLoginInfo.data.access_token,
          "Content-type": "application/x-www-form-urlencoded",
        },
      }
    );

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
    return res.status(200).send(getLoginInfo.data);
  } catch (err) {
    console.log("error");
    res.status(401).send("Unauthorized");
  }
};

export const refreshKakaoAccessToken = async (req: Request, res: Response) => {
  if (req.cookies.refreshToken === undefined)
    return res.status(401).send("don't have refresh token");
  try {
    const refreshInfo = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      {},
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        params: {
          grant_type: "refresh_token",
          client_id: process.env.KAKAO_REST_API_KEY,
          client_secret: process.env.KAKAO_CLIENT_SECRET,
          refresh_token: req.cookies.refreshToken,
        },
      }
    );
    if (refreshInfo.data.refresh_token) {
      setRefreshTokenCookie(res, refreshInfo.data.refresh_token);
    }
    res.status(200).send(refreshInfo.data);
  } catch (err) {
    console.log("refresh error");
    res.status(401).send("Unauthorized");
  }
};
