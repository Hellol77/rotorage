import { Request } from "express";

export const getAccessTokenToheader = (req: Request) => {
  try {
    const headers = req.headers.authorization || null;
    const accessToken = headers?.split(" ")[1] || null;
    return accessToken;
  } catch (err) {
    return null;
  }
};
