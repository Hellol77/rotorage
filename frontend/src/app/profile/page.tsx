"use client";
import React, { useContext, useEffect } from "react";

import ModalTriggerButton from "@/components/common/button/ModalTriggerButton";
import ProfileSkeletonCard from "@/components/common/skeleton/ProfileSkeletonCard";
import ProfileTitleText from "@/components/common/text/ProfileTitleText";
import DeleteUserModal from "@/components/modalTemplate/deleteUserModal/DeleteUserModal";
import ProfileEditModal from "@/components/modalTemplate/profileEditModal/ProfileEditModal";
import ProfileForm from "@/components/profile/ProfileForm";
import { UserDataContext } from "@/contexts/AuthContext";
import useSearchProfile from "@/hooks/queries/useSearchProfile";
import { useRouter, useSearchParams } from "next/navigation";

function MyProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const { data: userProfileData } = useSearchProfile(userId || "");

  const { user, accessToken } = useContext(UserDataContext);

  useEffect(() => {
    if (accessToken === "logout") {
      router.replace("/");
    }
  }, [accessToken, router]);

  return (
    <section className="mx-auto flex h-full w-full flex-col items-center">
      <ProfileTitleText text="프로필" />
      {accessToken === "" ? (
        <ProfileSkeletonCard />
      ) : (
        <>
          <ProfileForm user={userId ? userProfileData : user}>
            <ModalTriggerButton color="primary" size="sm" loginRequired text="프로필 편집">
              <ProfileEditModal />
            </ModalTriggerButton>
          </ProfileForm>
          <ModalTriggerButton color="text-warning" size="sm" loginRequired text="탈퇴하기">
            <DeleteUserModal />
          </ModalTriggerButton>
        </>
      )}
    </section>
  );
}

export default React.memo(MyProfilePage);
