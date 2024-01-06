import { Request } from "express";

export const getAccessTokenToheader = (req: Request) => {
  const headers = req.headers.authorization || null;
  const accessToken = headers?.split(" ")[1] || null;
  return accessToken;
};
