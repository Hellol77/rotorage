import { Response } from "express";

export const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
  res.cookie("refreshToken", refreshToken, {
    path: "/",
    sameSite: "none",
    secure: true,
    httpOnly: true,
  });
};
