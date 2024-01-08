import { UserData } from "@/types/user";
import axios from "axios";

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
}: {
  nickname: string;
  introduce: string;
}) => {
  const api = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL + `/user/profile`,
    { nickname, introduce },
  );
  return api;
};
