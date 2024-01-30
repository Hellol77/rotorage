import { defaultApi } from "@/apis/index";
import { ClientData, ValidateAccessToken } from "@/types/user";

export const refreshAccessTokenApi = async <T = ClientData>(oAuthType: string): Promise<T> => {
  const { data } = await defaultApi.post<T>(`/auth/${oAuthType}/refresh`);
  return data;
};

export const logoutApi = async (accessToken: string, id: string) => {
  const userData = { accessToken, id };
  const api = await defaultApi.post("/auth/kakao/logout", userData, {
    headers: { "Content-Type": "application/json" },
  });
  return api;
};

export const loginApi = async <T = ClientData>(search: string): Promise<T> => {
  const { data } = await defaultApi.get(`/auth/kakao/login?code=${search}`);
  return data;
};

export const validateAccessTokenApi = async <T = ValidateAccessToken>(
  accessToken: string,
): Promise<T> => {
  const { data } = await defaultApi.post("/auth/kakao/validate", {
    accessToken,
  });
  return data;
};
