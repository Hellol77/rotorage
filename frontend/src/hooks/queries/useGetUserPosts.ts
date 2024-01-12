import { useContext } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getUserPosts } from "@/apis/post";
import { queryKeys } from "@/apis/querykeys";
import { UserDataContext } from "@/contexts/AuthContext";

export default function useGetUserPosts(userId: string) {
  const { accessToken, user } = useContext(UserDataContext);
  return useInfiniteQuery({
    queryKey: queryKeys.getUserPosts(user.userId),
    queryFn: async ({ pageParam }) => {
      const res = await getUserPosts({ pageParam, accessToken, userId });
      return res;
    },

    enabled: accessToken !== "" && user.userId !== "",

    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) =>
      lastPage.pages.length >= 12 ? lastPage.pageParams : undefined,
  });
}
