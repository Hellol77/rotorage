import React, { useContext } from "react";
import { IsLoginContext, UserDataContext } from "@/contexts/AuthContext";
import { getProfileInfo } from "@/apis/user";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useGetProfile() {
  const { accessToken } = useContext(UserDataContext);
  const isLogin = useContext(IsLoginContext);
  const router = useRouter();
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const data = await getProfileInfo(accessToken);
      return data;
    },
    enabled: !!accessToken,
  });
}
