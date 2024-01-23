import { useContext } from "react";

import { getUserPosts } from "@/apis/post";
import { queryKeys } from "@/apis/querykeys";
import { UserDataContext } from "@/contexts/AuthContext";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useGetUserPosts(userId: string) {
  const { accessToken, user } = useContext(UserDataContext);
  return useInfiniteQuery({
    queryKey: queryKeys.getUserPosts,
    queryFn: async ({ pageParam }) => {
      const res = await getUserPosts({ pageParam, accessToken, userId });
      return res;
    },

    enabled: accessToken !== "" && user._id !== "",
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) =>
      lastPage.pages.length >= 12 ? lastPage.pageParams : undefined,
  });
}
