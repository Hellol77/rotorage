"use client";
import React, { useContext } from "react";

import { queryKeys } from "@/apis/querykeys";
import ProfileInfoContainer from "@/components/common/container/ProfileInfoContainer";
import InfiniteBoardGrid from "@/components/common/grid/InfiniteBoardGrid";
import { UserDataContext } from "@/contexts/AuthContext";
import useGetUserPosts from "@/hooks/queries/useGetUserPosts";
export default function MyPostsPage() {
  const { user, accessToken } = useContext(UserDataContext);
  const {
    data: userPostsData,
    fetchNextPage: userPostsFetchNextPage,
    isFetchingNextPage: userPostsIsFetchingNextPage,
    isPending: userPostsIsPending,
  } = useGetUserPosts(user.userId);
  return (
    <section className=" mx-auto h-full w-full">
      <h1 className="md:w-50 mb-4 mt-4 flex w-full font-Pretendard-SemiBold  text-xl md:mt-0 ">
        업로드한 게시물
      </h1>
      <ProfileInfoContainer>
        <InfiniteBoardGrid
          data={userPostsData}
          fetchNextPage={userPostsFetchNextPage}
          isFetchingNextPage={userPostsIsFetchingNextPage}
          isPending={userPostsIsPending}
          queryKey={queryKeys.getUserPosts}
        />
      </ProfileInfoContainer>
    </section>
  );
}
