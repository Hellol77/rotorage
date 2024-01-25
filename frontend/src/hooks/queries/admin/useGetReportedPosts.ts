import { useContext } from "react";

import { getReportedPosts } from "@/apis/admin";
import { queryKeys } from "@/apis/querykeys";
import { BOARD_POSTS_LIMIT } from "@/constants/boardPosts";
import { UserDataContext } from "@/contexts/AuthContext";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useGetReportedPosts() {
  const { accessToken } = useContext(UserDataContext);
  return useInfiniteQuery({
    queryKey: queryKeys.getReportedPosts,
    queryFn: async ({ pageParam }) => {
      const res = await getReportedPosts({ pageParam, accessToken });
      return res;
    },

    enabled: accessToken !== "",

    // 다시 생각해봐야 할 부분
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      console.log(lastPage.pages?.length, BOARD_POSTS_LIMIT);
      return lastPage.pages?.length || 0 >= BOARD_POSTS_LIMIT ? lastPage.pageParams : undefined;
    },
  });
}
