import React from "react";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import BoardGrid from "@/components/board/grid/BoardGrid";
import MainContainer from "@/components/common/ui/container/MainContainer";
import ProfileInfoContainer from "@/components/common/ui/container/ProfileInfoContainer";
import ProfileForm from "@/components/profile/ProfileForm";

export default function MyPage() {
  const cookieStore = cookies();
  const refreshtoken = cookieStore.get("refreshToken");
  if (!refreshtoken) {
    redirect("/login");
  }
  return (
    <MainContainer>
      <ProfileForm />
      <h1 className="md:w-50 mb-4 flex w-full  font-Pretendard-SemiBold text-xl ">
        종아요한 게시물
      </h1>
      <ProfileInfoContainer>
        <BoardGrid />
      </ProfileInfoContainer>
    </MainContainer>
  );
}
