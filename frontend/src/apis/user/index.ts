import { defaultApi } from "@/apis/index";
import { UserData, UserEditProfileType } from "@/types/user";

export const getProfileInfo = async (
  accessToken: string,
): Promise<UserData> => {
  const { data } = await defaultApi.post("/api/user/profile", {
    accessToken: accessToken,
  });
  return data;
};

export const editProfile = async ({
  nickname,
  introduce,
  accessToken,
}: UserEditProfileType) => {
  const api = await defaultApi.post(
    `/api/user/profile/edit`,
    { nickname, introduce },
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  return api;
};
