import { useContext } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getLikedPosts } from "@/apis/post/index";
import { queryKeys } from "@/apis/querykeys";
import { UserDataContext } from "@/contexts/AuthContext";

export function useGetLikedPosts() {
  const { accessToken } = useContext(UserDataContext);
  return useInfiniteQuery({
    queryKey: queryKeys.getLikedPosts,
    queryFn: async ({ pageParam }) => {
      const res = await getLikedPosts({ pageParam, accessToken });
      return res;
    },

    enabled: accessToken !== "",

    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) =>
      lastPage.pages.length >= 12 ? lastPage.pageParams : undefined,
  });
}
