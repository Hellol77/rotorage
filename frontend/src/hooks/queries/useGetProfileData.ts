import { useContext } from "react";

import { queryKeys } from "@/apis/querykeys";
import { getMyProfileInfo } from "@/apis/user";
import { ACCESS_TOKEN_LOGOUT_STATE } from "@/constants/user";
import { UserDataContext } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";

export function useGetProfile() {
  const { accessToken } = useContext(UserDataContext);

  return useQuery({
    queryKey: queryKeys.getProfile,
    queryFn: async () => {
      const data = await getMyProfileInfo(accessToken);
      return data;
    },
    enabled: !ACCESS_TOKEN_LOGOUT_STATE.includes(accessToken),
  });
}
