"use client";
import React, { useContext, useEffect } from "react";

import { queryKeys } from "@/apis/querykeys";
import ModalTriggerButton from "@/components/common/button/ModalTriggerButton";
import ProfileInfoContainer from "@/components/common/container/ProfileInfoContainer";
import InfiniteBoardGrid from "@/components/common/grid/InfiniteBoardGrid";
import ProfileSkeletonCard from "@/components/common/skeleton/ProfileSkeletonCard";
import ProfileEditModal from "@/components/modal/profileModal/ProfileEditModal";
import ProfileForm from "@/components/profile/ProfileForm";
import { UserDataContext } from "@/contexts/AuthContext";
import { useGetLikedPosts } from "@/hooks/queries/useGetLikedPosts";
import useGetUserPosts from "@/hooks/queries/useGetUserPosts";
import { useRouter } from "next/navigation";

function ProfilePage() {
  const router = useRouter();
  const { user, accessToken } = useContext(UserDataContext);
  const {
    data: userPostsData,
    fetchNextPage: userPostsFetchNextPage,
    isFetchingNextPage: userPostsIsFetchingNextPage,
    isPending: userPostsIsPending,
  } = useGetUserPosts(user.userId);
  console.log(user);
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
    <section className=" mx-auto h-full w-full">
      <h1 className="md:w-50 mb-4 mt-4 flex w-full  font-Pretendard-SemiBold text-xl">프로필</h1>

      {accessToken === "" ? (
        <ProfileSkeletonCard />
      ) : (
        <ProfileForm user={user}>
          <ModalTriggerButton loginRequired text="프로필 편집">
            <ProfileEditModal />
          </ModalTriggerButton>
        </ProfileForm>
      )}
      <h1 className="md:w-50 mb-4 mt-4 flex w-full  font-Pretendard-SemiBold text-xl ">
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
    </section>
  );
}

export default React.memo(ProfilePage);
