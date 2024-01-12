"use client";
import React, { useContext, useEffect } from "react";

import { useRouter } from "next/navigation";

import { queryKeys } from "@/apis/querykeys";
import InfiniteBoardGrid from "@/components/board/grid/InfiniteBoardGrid";
import ModalTriggerButton from "@/components/common/button/ModalTriggerButton";
import ProfileSkeletonCard from "@/components/common/skeleton/ProfileSkeletonCard";
import MainContainer from "@/components/common/ui/container/MainContainer";
import ProfileInfoContainer from "@/components/common/ui/container/ProfileInfoContainer";
import ProfileEditModal from "@/components/profile/modal/ProfileEditModal";
import ProfileForm from "@/components/profile/ProfileForm";
import { UserDataContext } from "@/contexts/AuthContext";
import { useGetLikedPosts } from "@/hooks/queries/useGetLikedPosts";
import useGetUserPosts from "@/hooks/queries/useGetUserPosts";

export default function ProfilePage() {
  const router = useRouter();
  const { user, accessToken } = useContext(UserDataContext);
  const {
    data: userPostsData,
    fetchNextPage: userPostsFetchNextPage,
    isFetchingNextPage: userPostsIsFetchingNextPage,
    isPending: userPostsIsPending,
  } = useGetUserPosts(user.userId);
  const {
    data: userLikedPosts,
    fetchNextPage: userLikedPostsFetchNextPage,
    isFetchingNextPage: userLikedPostsIsFetchingNextPage,
    isPending: userLikedPostsIsPending,
  } = useGetLikedPosts();
  useEffect(() => {
    if (accessToken === "logout") {
      router.replace("/");
    }
  }, [accessToken, router]);
  return (
    <MainContainer>
      <h1 className="md:w-50 mb-4 flex w-full  font-Pretendard-SemiBold text-xl ">
        프로필
      </h1>
      {accessToken === "" ? (
        <ProfileSkeletonCard />
      ) : (
        <ProfileForm user={user}>
          <ModalTriggerButton loginRequired text="프로필 편집">
            <ProfileEditModal />
          </ModalTriggerButton>
        </ProfileForm>
      )}
      <h1 className="md:w-50 mb-4 mt-10 flex w-full  font-Pretendard-SemiBold text-xl ">
        좋아요한 게시물
      </h1>
      <ProfileInfoContainer>
        <InfiniteBoardGrid
          data={userLikedPosts}
          fetchNextPage={userLikedPostsFetchNextPage}
          isFetchingNextPage={userLikedPostsIsFetchingNextPage}
          isPending={userLikedPostsIsPending}
          queryKey={queryKeys.getLikedPosts}
        />
      </ProfileInfoContainer>
      <h1 className="md:w-50 mb-4 mt-10 flex w-full  font-Pretendard-SemiBold text-xl ">
        업로드한 게시물
      </h1>
      <ProfileInfoContainer>
        <InfiniteBoardGrid
          data={userPostsData}
          fetchNextPage={userPostsFetchNextPage}
          isFetchingNextPage={userPostsIsFetchingNextPage}
          isPending={userPostsIsPending}
          queryKey={queryKeys.getUserPosts(user.userId)}
        />
      </ProfileInfoContainer>
    </MainContainer>
  );
}
