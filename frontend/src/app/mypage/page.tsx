import React from "react";
import ProfileForm from "@/components/profile/ProfileForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import MainContainer from "@/components/common/ui/container/MainContainer";
import ModalTriggerButton from "@/components/board/modal/button/ModalTriggerButton";

export default function MyPage() {
  const cookieStore = cookies();
  const refreshtoken = cookieStore.get("refreshToken");
  if (!refreshtoken) {
    redirect("/login");
  }
  return (
    <MainContainer>
      <h1 className="md:w-50 mb-4 flex w-full  font-Pretendard-SemiBold text-2xl ">
        닉네임
      </h1>
      {/* <ModalTriggerButton text="수정하기">
        
      </ModalTriggerButton> */}
      <ProfileForm />
    </MainContainer>
  );
}
