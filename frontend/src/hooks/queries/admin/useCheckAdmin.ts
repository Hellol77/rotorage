import { useContext } from "react";

import { checkAdmin } from "@/apis/admin";
import { queryKeys } from "@/apis/querykeys";
import { UserDataContext } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";

export default function useCheckAdmin() {
  const { accessToken } = useContext(UserDataContext);
  return useQuery({
    queryKey: queryKeys.checkAdmin,
    queryFn: async () => checkAdmin(accessToken),
    enabled: accessToken !== "",
  });
}
