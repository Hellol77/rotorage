import { useContext } from "react";

import { getBoardPosts } from "@/apis/post/index";
import { queryKeys } from "@/apis/querykeys";
import { UserDataContext } from "@/contexts/AuthContext";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useGetBoardPosts() {
  const { accessToken } = useContext(UserDataContext);
  return useInfiniteQuery({
    queryKey: queryKeys.boardPosts,
    queryFn: async ({ pageParam }) => {
      const res = await getBoardPosts({ pageParam, accessToken });
      return res;
    },

    enabled: accessToken !== "",

    // 다시 생각해봐야 할 부분
    gcTime: Infinity,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) =>
      lastPage.pages.length >= 12 ? lastPage.pageParams : undefined,
  });
}
