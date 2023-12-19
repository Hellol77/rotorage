import { UserData, ValidateAccessToken } from "@/types/user";
import axios from "axios";

export const refreshAccessTokenApi = async <T = UserData>(
  oAuthType: string,
): Promise<T> => {
  const { data } = await axios.post<T>(`/api/auth/${oAuthType}/refresh`);
  return data;
};

export const logoutApi = async (accessToken: string, id: string) => {
  const userData = { accessToken, id };
  const api = await axios.post("/api/auth/kakao/logout", userData, {
    headers: { "Content-Type": "application/json" },
  });
  return api;
};

export const loginApi = async <T = UserData>(search: string): Promise<T> => {
  const { data } = await axios.get(`/api/auth/kakao/login?code=${search}`);
  return data;
};

export const validateAccessTokenApi = async <T = ValidateAccessToken>(
  accessToken: string,
): Promise<T> => {
  const { data } = await axios.post("/api/auth/kakao/validate", {
    accessToken,
  });
  return data;
};
