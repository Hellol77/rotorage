import { Response } from "express";

export const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
  res.cookie("refreshToken", refreshToken, {
    sameSite: "none",
    domain: "localhost", // 변경 필요
    secure: true,
    httpOnly: true,
  });
};
