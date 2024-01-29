"use client";
import React, { useContext } from "react";

import { queryKeys } from "@/apis/querykeys";
import ProfileInfoContainer from "@/components/common/container/ProfileInfoContainer";
import InfiniteBoardGrid from "@/components/common/grid/InfiniteBoardGrid";
import ProfileTitleText from "@/components/common/text/ProfileTitleText";
import { UserDataContext } from "@/contexts/AuthContext";
import useGetUserPosts from "@/hooks/queries/useGetUserPosts";
import { useSearchParams } from "next/navigation";

export default function MyPostsPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const { user, accessToken } = useContext(UserDataContext);

  const {
    data: userPostsData,
    fetchNextPage: userPostsFetchNextPage,
    isFetchingNextPage: userPostsIsFetchingNextPage,
    isPending: userPostsIsPending,
  } = useGetUserPosts(userId || user._id);
  return (
    <section className=" mx-auto h-full w-full">
      <ProfileTitleText text="업로드한 게시물" />
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
