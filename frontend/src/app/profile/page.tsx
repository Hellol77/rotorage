"use client";
import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

import BoardGrid from "@/components/board/grid/BoardGrid";
import MainContainer from "@/components/common/ui/container/MainContainer";
import ProfileInfoContainer from "@/components/common/ui/container/ProfileInfoContainer";
import ProfileForm from "@/components/profile/ProfileForm";
import { UserDataContext } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const router = useRouter();
  const { user, accessToken } = useContext(UserDataContext);
  useEffect(() => {
    if (accessToken === "logout") {
      router.replace("/");
    }
  }, [accessToken, router]);
  return (
    <MainContainer>
      <ProfileForm user={user} />
      <h1 className="md:w-50 mb-4 flex w-full  font-Pretendard-SemiBold text-xl ">
        종아요한 게시물
      </h1>
      <ProfileInfoContainer>
        <BoardGrid />
      </ProfileInfoContainer>
    </MainContainer>
  );
}
