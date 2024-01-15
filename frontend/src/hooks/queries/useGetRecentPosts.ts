import { useContext } from "react";

import { getRecentPosts } from "@/apis/post";
import { queryKeys } from "@/apis/querykeys";
import { UserDataContext } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";

export default function useGetRecentPosts() {
  const { accessToken } = useContext(UserDataContext);
  return useQuery({
    queryKey: queryKeys.recentPosts,
    queryFn: async () => getRecentPosts(accessToken),
    enabled: accessToken !== "",
  });
}
