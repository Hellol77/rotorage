import { setRefreshTokenCookie } from "../../utils/setRefreshToken";
import { Request, Response } from "express";
import { User } from "../../models/user";
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
    const userId = getUserInfo.data.id.toString();

    const userExists = await User.exists({ userId });

    if (!userExists) {
      const newUserInfo = {
        userId,
        nickname: getUserInfo.data.properties.nickname,
      };
      const newUser = new User(newUserInfo);
      newUser.save().then(() => {
        console.log("create new User");
      });
      const userData = {
        user: newUserInfo,
        accessToken: getLoginInfo.data.access_token,
      };
      return res.status(200).send(userData);
    }

    const userInfo = await User.findOne({ userId }, { _id: 0 });
    const userData = {
      user: userInfo,
      accessToken: getLoginInfo.data.access_token,
    };
    return res.status(200).send(userData);
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

    const userInfo = await User.findOne(
      { userId: getTokenInfo.data.id },
      { _id: 0 }
    );

    const userData = {
      user: userInfo,
      accessToken: refreshInfo.data.access_token,
    };
    res.status(200).send(userData);
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
};

export const logoutKakao = async (req: Request, res: Response) => {
  const accessToken = req.body.accessToken;
  const userId = req.body.id;
  try {
    await axios.post(
      "https://kapi.kakao.com/v1/user/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          target_id_type: "user_id",
          target_id: userId,
        },
      }
    );
    res.clearCookie("refreshToken");
    res.status(200).send("Success Logout");
  } catch (err) {
    // console.log("logout error", err);
    res.status(400).send("Unauthorized");
  }
};

export const validateAccessToken = async (req: Request, res: Response) => {
  try {
    const accessToken = req.body.accessToken;
    const tokenInfo = await axios.get(
      "https://kapi.kakao.com/v1/user/access_token_info	",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const userId = tokenInfo.data.id.toString();

    if (tokenInfo.data.expires_in < 60 * 60) {
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
      const refreshedAccessToken = refreshInfo.data.access_token;

      const data = { userId, accessToken: refreshedAccessToken };
      res.status(200).send(data);
    }

    const data = { userId, accessToken };
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(401).send("Unauthorized");
  }
};
