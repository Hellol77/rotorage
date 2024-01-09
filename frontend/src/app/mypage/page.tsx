import React from "react";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import MainContainer from "@/components/common/ui/container/MainContainer";
import ProfileForm from "@/components/profile/ProfileForm";

export default function MyPage() {
  const cookieStore = cookies();
  const refreshtoken = cookieStore.get("refreshToken");
  if (!refreshtoken) {
    redirect("/login");
  }
  return (
    <MainContainer>
      <h1 className="md:w-50 mb-4 flex w-full  font-Pretendard-SemiBold text-xl ">
        프로필
      </h1>
      <ProfileForm />
    </MainContainer>
  );
}
