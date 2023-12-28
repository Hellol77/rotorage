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
