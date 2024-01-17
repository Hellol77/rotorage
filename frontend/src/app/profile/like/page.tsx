"use client";
import React from "react";

import { queryKeys } from "@/apis/querykeys";
import ProfileInfoContainer from "@/components/common/container/ProfileInfoContainer";
import InfiniteBoardGrid from "@/components/common/grid/InfiniteBoardGrid";
import ProfileTitleText from "@/components/common/text/ProfileTitleText";
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
      <ProfileTitleText text="좋아요한 게시물" />
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
