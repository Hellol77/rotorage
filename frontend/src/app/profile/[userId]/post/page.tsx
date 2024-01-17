"use client";
import React from "react";

import { queryKeys } from "@/apis/querykeys";
import ProfileInfoContainer from "@/components/common/container/ProfileInfoContainer";
import InfiniteBoardGrid from "@/components/common/grid/InfiniteBoardGrid";
import ProfileTitleText from "@/components/common/text/ProfileTitleText";
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
      <ProfileTitleText text="업로드한 게시물" />
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
