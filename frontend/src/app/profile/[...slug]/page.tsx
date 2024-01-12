"use client";
import React from "react";

import { useParams } from "next/navigation";

import { queryKeys } from "@/apis/querykeys";
import InfiniteBoardGrid from "@/components/board/grid/InfiniteBoardGrid";
import ExclamationIcon from "@/components/common/icon/ExclamationIcon";
import ProfileSkeletonCard from "@/components/common/skeleton/ProfileSkeletonCard";
import MainContainer from "@/components/common/ui/container/MainContainer";
import ProfileInfoContainer from "@/components/common/ui/container/ProfileInfoContainer";
import ProfileForm from "@/components/profile/ProfileForm";
import useGetUserPosts from "@/hooks/queries/useGetUserPosts";
import useSearchProfile from "@/hooks/queries/useSearchProfile";

export default function SearchProfilePage() {
  const { slug } = useParams();
  const searchUserId = slug[0];
  const { data: userProfileData, isLoading } = useSearchProfile(searchUserId);
  const { data, fetchNextPage, isFetchingNextPage, isPending } =
    useGetUserPosts(searchUserId);
  return (
    <MainContainer>
      <h1 className="md:w-50 mb-4 flex w-full  font-Pretendard-SemiBold text-xl ">
        프로필
      </h1>
      {isLoading ? (
        <ProfileSkeletonCard />
      ) : userProfileData ? (
        <ProfileForm user={userProfileData} />
      ) : (
        <ProfileInfoContainer className="flex flex-col items-center justify-center">
          <ExclamationIcon size={56} className="  mb-3 stroke-gray-500" />
          <span className=" font-Pretendard-Regular">
            사용자를 찾을 수 없습니다
          </span>
          <span className=" font-Pretendard-Regular text-gray-300">
            클릭하신 링크가 잘못되었거나 존재하지 않는 사용자입니다.
          </span>
        </ProfileInfoContainer>
      )}

      <h1 className="md:w-50 mb-4 mt-10 flex w-full  font-Pretendard-SemiBold text-xl ">
        업로드한 게시물
      </h1>
      <ProfileInfoContainer>
        <InfiniteBoardGrid
          data={data}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isPending={isPending}
          queryKey={queryKeys.getUserPosts(searchUserId)}
        />
      </ProfileInfoContainer>
    </MainContainer>
  );
}
