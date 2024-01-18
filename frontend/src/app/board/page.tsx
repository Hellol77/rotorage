"use client";
import React from "react";

import { queryKeys } from "@/apis/querykeys";
import BoardHeader from "@/components/board/header/BoardHeader";
import MainContainer from "@/components/common/container/MainContainer";
import InfiniteBoardGrid from "@/components/common/grid/InfiniteBoardGrid";
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
