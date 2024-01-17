"use client";
import React from "react";

import { queryKeys } from "@/apis/querykeys";
import ProfileInfoContainer from "@/components/common/container/ProfileInfoContainer";
import InfiniteBoardGrid from "@/components/common/grid/InfiniteBoardGrid";
import { useGetLikedPosts } from "@/hooks/queries/useGetLikedPosts";

export default function LikedPostsPage() {
  const {
    data: userLikedPosts,
    fetchNextPage: userLikedPostsFetchNextPage,
    isFetchingNextPage: userLikedPostsIsFetchingNextPage,
    isPending: userLikedPostsIsPending,
  } = useGetLikedPosts();
  return (
    <section className=" mx-auto h-full w-full">
      <h1 className="md:w-50 mb-4  flex w-full  font-Pretendard-SemiBold text-xl ">
        좋아요한 게시물
      </h1>
      <ProfileInfoContainer className="bg-[#18181b]">
        <InfiniteBoardGrid
          data={userLikedPosts}
          fetchNextPage={userLikedPostsFetchNextPage}
          isFetchingNextPage={userLikedPostsIsFetchingNextPage}
          isPending={userLikedPostsIsPending}
          queryKey={queryKeys.getLikedPosts}
        />
      </ProfileInfoContainer>
    </section>
  );
}
