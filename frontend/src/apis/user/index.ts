import { UserData } from "@/types/user";
import axios from "axios";

export const getProfileInfo = async (
  accessToken: string,
): Promise<UserData> => {
  const { data } = await axios.post("http://localhost:8080/user/profile", {
    accessToken: accessToken,
  });
  return data;
};
