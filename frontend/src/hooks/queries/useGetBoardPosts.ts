import { queryKeys } from "@/apis/querykeys";
import { useContext } from "react";
import { getBoardPosts } from "../../apis/post/index";
import { useInfiniteQuery } from "@tanstack/react-query";
import { UserDataContext } from "@/contexts/AuthContext";

export function useGetBoardPosts() {
  const { accessToken } = useContext(UserDataContext);
  return useInfiniteQuery({
    queryKey: [queryKeys.boardPosts],
    queryFn: async ({ pageParam }) => {
      const res = await getBoardPosts({ pageParam, accessToken });
      return res;
    },

    enabled: !!accessToken || accessToken === "logout",
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) =>
      lastPage.pages.length >= 12 ? lastPage.pageParams : undefined,
  });
}
