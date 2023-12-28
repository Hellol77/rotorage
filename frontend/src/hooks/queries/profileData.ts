import { useContext } from "react";
import { UserDataContext } from "@/contexts/AuthContext";
import { getProfileInfo } from "@/apis/user";
import { useQuery } from "@tanstack/react-query";

export function useGetProfile() {
  const { accessToken } = useContext(UserDataContext);

  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const data = await getProfileInfo(accessToken);
      return data;
    },
    enabled: !!accessToken,
  });
}
