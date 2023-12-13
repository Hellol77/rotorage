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
          redirect_uri: "http://localhost:3000/login/auth/kakao",
          code,
        },
      }
    );
    console.log("token", getLoginAccessToken.data.access_token);
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
    console.log("info", getUserInfo.data);
    res.status(200).send(getUserInfo.data);
  } catch (err) {
    console.log(err);
    res.status(401).send("Unauthorized");
  }
};
