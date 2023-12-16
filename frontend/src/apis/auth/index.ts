import axios from "axios";
import React from "react";

export const refreshKakaoAccessToken = async () => {
  const api = await axios.post("/api/auth/refresh/kakao");
  return api;
};
