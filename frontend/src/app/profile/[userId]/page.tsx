"use client";
import React from "react";

import ProfileInfoContainer from "@/components/common/container/ProfileInfoContainer";
import ExclamationIcon from "@/components/common/icon/ExclamationIcon";
import ProfileSkeletonCard from "@/components/common/skeleton/ProfileSkeletonCard";
import ProfileTitleText from "@/components/common/text/ProfileTitleText";
import ProfileForm from "@/components/profile/ProfileForm";
import useSearchProfile from "@/hooks/queries/useSearchProfile";
import { useParams } from "next/navigation";

export default function SearchProfilePage() {
  const { userId } = useParams();
  const searchUserId = userId[0];
  const { data: userProfileData, isLoading } = useSearchProfile(searchUserId);
  return (
    <section className="mx-auto h-full w-full">
      <ProfileTitleText text="프로필" />
      {isLoading ? (
        <ProfileSkeletonCard />
      ) : userProfileData ? (
        <ProfileForm user={userProfileData} />
      ) : (
        <ProfileInfoContainer className="flex flex-col items-center justify-center ">
          <ExclamationIcon size={56} className="  mb-3 stroke-gray-500" />
          <span className=" font-Pretendard-Regular">사용자를 찾을 수 없습니다</span>
          <span className=" font-Pretendard-Regular text-gray-300">
            클릭하신 링크가 잘못되었거나 존재하지 않는 사용자입니다.
          </span>
        </ProfileInfoContainer>
      )}
    </section>
  );
}
