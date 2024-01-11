import { useContext } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import { queryKeys } from "@/apis/querykeys";
import { UserDataContext } from "@/contexts/AuthContext";

import { getBoardPosts } from "../../apis/post/index";

export function useGetBoardPosts() {
  const { accessToken } = useContext(UserDataContext);
  return useInfiniteQuery({
    queryKey: [queryKeys.boardPosts],
    queryFn: async ({ pageParam }) => {
      const res = await getBoardPosts({ pageParam, accessToken });
      return res;
    },

    enabled: accessToken !== "",
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) =>
      lastPage.pages.length >= 12 ? lastPage.pageParams : undefined,
  });
}
