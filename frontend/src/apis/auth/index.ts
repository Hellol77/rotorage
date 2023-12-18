import { UserData } from "@/types/user";
import axios from "axios";

export const refreshAccessTokenApi = async (oAuthType: string) => {
  const api: UserData = await axios.post(`/api/auth/${oAuthType}/refresh`);
  return api;
};

export const logoutApi = async (accessToken: string, id: number) => {
  const userData = { accessToken, id };
  const api = await axios.post("/api/auth/kakao/logout", userData, {
    headers: { "Content-Type": "application/json" },
  });
  return api;
};

export const loginApi = async (search: string) => {
  const api: UserData = await axios.get(`/api/auth/kakao/login?code=${search}`);
  return api;
};
