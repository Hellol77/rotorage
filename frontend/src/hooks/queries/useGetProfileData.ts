import { useContext } from "react";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/apis/querykeys";
import { getProfileInfo } from "@/apis/user";
import { ACCESS_TOKEN_LOGOUT_STATE } from "@/constants/user";
import { UserDataContext } from "@/contexts/AuthContext";

export function useGetProfile() {
  const { accessToken } = useContext(UserDataContext);

  return useQuery({
    queryKey: [queryKeys.getProfile],
    queryFn: async () => {
      const data = await getProfileInfo(accessToken);
      return data;
    },
    enabled: !ACCESS_TOKEN_LOGOUT_STATE.includes(accessToken),
  });
}
