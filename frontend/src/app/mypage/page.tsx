import React from "react";
import CenterContainer from "@/components/common/container/CenterContainer";
import ProfileForm from "@/components/profile/ProfileForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function MyPage() {
  const cookieStore = cookies();
  const refreshtoken = cookieStore.get("refreshToken");
  if (!refreshtoken) {
    redirect("/login");
  }
  return (
    <CenterContainer>
      <ProfileForm />
    </CenterContainer>
  );
}
