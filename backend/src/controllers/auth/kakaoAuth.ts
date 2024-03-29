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
    const kakaoUserId = getUserInfo.data.id.toString();

    const userExists = await User.exists({ userId: kakaoUserId });

    const userInfo = await User.findOne({ userId: kakaoUserId }).lean();
    if (!userExists) {
      const newUser = new User({
        userId: kakaoUserId,
        nickname: getUserInfo.data.properties.nickname,
      });
      await newUser.save();

      const newUserInfo = {
        ...userInfo,
        nickname: getUserInfo.data.properties.nickname,
        _id: userInfo?._id,
      };
      const userData = {
        user: newUserInfo,
        accessToken: getLoginInfo.data.access_token,
      };
      return res.status(200).send(userData);
    }

    const newUserInfo = {
      ...userInfo,
      _id: userInfo?._id,
    };
    const userData = {
      user: newUserInfo,
      accessToken: getLoginInfo.data.access_token,
    };

    console.log(userData);
    return res.status(200).send(userData);
  } catch (err) {
    console.log("loginerror", err);
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

    const userInfo = await User.findOne({
      userId: getTokenInfo.data.id,
    }).lean();
    const refreshUserInfo = {
      ...userInfo,
      _id: userInfo?._id,
    };
    const userData = {
      user: refreshUserInfo,
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
    const userInfo = await User.findOne({ userId: userId }, { _id: 1 }).lean();
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

      const data = { _id: userInfo?._id, accessToken: refreshedAccessToken };
      return res.status(200).send(data);
    }

    const data = { _id: userInfo?._id, accessToken };
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    return res.status(401).send("Unauthorized");
  }
};
