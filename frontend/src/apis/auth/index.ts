import { defaultApi } from "@/apis/index";
import { ClientData, ValidateAccessToken } from "@/types/user";

export const refreshAccessTokenApi = async <T = ClientData>(oAuthType: string): Promise<T> => {
  const { data } = await defaultApi.post<T>(`/api/auth/${oAuthType}/refresh`);
  return data;
};

export const logoutApi = async (accessToken: string, id: string) => {
  const userData = { accessToken, id };
  const api = await defaultApi.post("/api/auth/kakao/logout", userData, {
    headers: { "Content-Type": "application/json" },
  });
  return api;
};

export const loginApi = async <T = ClientData>(search: string): Promise<T> => {
  const { data } = await defaultApi.get(`/api/auth/kakao/login?code=${search}`);
  return data;
};

export const validateAccessTokenApi = async <T = ValidateAccessToken>(
  accessToken: string,
): Promise<T> => {
  const { data } = await defaultApi.post("/api/auth/kakao/validate", {
    accessToken,
  });
  return data;
};
