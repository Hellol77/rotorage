import { useContext } from "react";

import { useQuery } from "@tanstack/react-query";

import { getRecentPosts } from "@/apis/post";
import { queryKeys } from "@/apis/querykeys";
import { UserDataContext } from "@/contexts/AuthContext";

export default function useGetRecentPosts() {
  const { accessToken } = useContext(UserDataContext);
  return useQuery({
    queryKey: queryKeys.recentPosts,
    queryFn: async () => getRecentPosts(accessToken),
    enabled: accessToken !== "",
  });
}
