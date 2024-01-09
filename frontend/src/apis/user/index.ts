import axios from "axios";

import { UserData, UserEditProfileType } from "@/types/user";

export const getProfileInfo = async (
  accessToken: string,
): Promise<UserData> => {
  const { data } = await axios.post("/api/user/profile", {
    accessToken: accessToken,
  });
  return data;
};

export const editProfile = async ({
  nickname,
  introduce,
  accessToken,
}: UserEditProfileType) => {
  const api = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + `/user/profile/edit`,
    { nickname, introduce },
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  return api;
};
