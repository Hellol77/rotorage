"use client";
import React from "react";

import { queryKeys } from "@/apis/querykeys";
import ProfileInfoContainer from "@/components/common/container/ProfileInfoContainer";
import InfiniteBoardGrid from "@/components/common/grid/InfiniteBoardGrid";
import useGetUserPosts from "@/hooks/queries/useGetUserPosts";
import { useParams } from "next/navigation";

export default function SearchUserPostspage() {
  const { userId } = useParams();

  const {
    data: userPostsData,
    fetchNextPage: userPostsFetchNextPage,
    isFetchingNextPage: userPostsIsFetchingNextPage,
    isPending: userPostsIsPending,
  } = useGetUserPosts(userId[0]);
  return (
    <section className=" mx-auto h-full w-full">
      <h1 className="md:w-50 mb-4  flex w-full  font-Pretendard-SemiBold text-xl ">
        업로드한 게시물
      </h1>
      <ProfileInfoContainer>
        <InfiniteBoardGrid
          data={userPostsData}
          fetchNextPage={userPostsFetchNextPage}
          isFetchingNextPage={userPostsIsFetchingNextPage}
          isPending={userPostsIsPending}
          queryKey={queryKeys.getUserPosts(userId[0])}
        />
      </ProfileInfoContainer>
    </section>
  );
}
