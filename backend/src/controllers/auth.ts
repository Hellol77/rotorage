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
    const getTokenInfo = await axios.get(
      "https://kapi.kakao.com/v1/user/access_token_info",
      {
        headers: {
          Authorization: "Bearer " + refreshInfo.data.access_token,
        },
      }
    );
    // https://kapi.kakao.com/v1/user/access_token_info 토큰 정보 확인한 다음 id로 유저 정보 가져오기
    const userInfo = await User.findOne(
      { id: getTokenInfo.data.id },
      { nickname: 1, _id: 0, id: 1 }
    );
    console.log("ddd", userInfo);
    const userData = {
      user: userInfo,
      accessToken: refreshInfo.data.access_token,
    };
    res.status(200).send(userData);
  } catch (err) {
    console.log("refresh error");
    res.status(401).send("Unauthorized");
  }
};
