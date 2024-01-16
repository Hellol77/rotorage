"use client";
import React from "react";

import { queryKeys } from "@/apis/querykeys";
import BoardHeader from "@/components/board/BoardHeader";
import InfiniteBoardGrid from "@/components/common/grid/InfiniteBoardGrid";
import MainContainer from "@/components/common/ui/container/MainContainer";
import { useGetBoardPosts } from "@/hooks/queries/useGetBoardPosts";

export default function BoradPage() {
  const { data, fetchNextPage, isFetchingNextPage, isPending } = useGetBoardPosts();
  return (
    <MainContainer>
      <section className="relative mx-auto h-full w-screen">
        <BoardHeader />
        <InfiniteBoardGrid
          data={data}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isPending={isPending}
          queryKey={queryKeys.boardPosts}
        />
      </section>
    </MainContainer>
  );
}
