import { defaultApi } from "@/apis/index";
import { UserData, UserEditProfileType } from "@/types/user";

export const getMyProfileInfo = async (accessToken: string): Promise<UserData> => {
  const { data } = await defaultApi.post("/api/user/profile", {
    accessToken: accessToken,
  });
  return data;
};

export const editProfile = async (data: UserEditProfileType) => {
  const formData = new FormData();
  const { accessToken, ...restData } = data;
  Object.entries(restData).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const api = await defaultApi.post(`/api/user/profile/edit`, formData, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return api;
};

export const searchProfile = async (_id: string) => {
  const { data } = await defaultApi.get(`/api/user/profile/${_id}`);
  return data;
};
