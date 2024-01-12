"use client";
import React, { useContext, useEffect } from "react";

import { useRouter } from "next/navigation";

import { queryKeys } from "@/apis/querykeys";
import InfiniteBoardGrid from "@/components/board/grid/InfiniteBoardGrid";
import MainContainer from "@/components/common/ui/container/MainContainer";
import ProfileInfoContainer from "@/components/common/ui/container/ProfileInfoContainer";
import ProfileForm from "@/components/profile/ProfileForm";
import { UserDataContext } from "@/contexts/AuthContext";
import useGetUserPosts from "@/hooks/queries/useGetUserPosts";

export default function ProfilePage() {
  const router = useRouter();
  const { user, accessToken } = useContext(UserDataContext);
  const { data, fetchNextPage, isFetchingNextPage, isPending } =
    useGetUserPosts(user.userId);
  useEffect(() => {
    if (accessToken === "logout") {
      router.replace("/");
    }
  }, [accessToken, router]);
  return (
    <MainContainer>
      <ProfileForm user={user} />
      <h1 className="md:w-50 mb-4 flex w-full  font-Pretendard-SemiBold text-xl ">
        업로드한 게시물
      </h1>
      <ProfileInfoContainer>
        <InfiniteBoardGrid
          data={data}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isPending={isPending}
          queryKey={queryKeys.getUserPosts(user.userId)}
        />
      </ProfileInfoContainer>
    </MainContainer>
  );
}
