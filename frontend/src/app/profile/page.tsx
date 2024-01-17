"use client";
import React, { useContext, useEffect } from "react";

import ModalTriggerButton from "@/components/common/button/ModalTriggerButton";
import ProfileSkeletonCard from "@/components/common/skeleton/ProfileSkeletonCard";
import ProfileTitleText from "@/components/common/text/ProfileTitleText";
import ProfileEditModal from "@/components/modal/profileModal/ProfileEditModal";
import ProfileForm from "@/components/profile/ProfileForm";
import { UserDataContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

function MyProfilePage() {
  const router = useRouter();
  const { user, accessToken } = useContext(UserDataContext);

  useEffect(() => {
    if (accessToken === "logout") {
      router.replace("/");
    }
  }, [accessToken, router]);

  return (
    <section className=" mx-auto h-full w-full">
      <ProfileTitleText text="프로필" />
      {accessToken === "" ? (
        <ProfileSkeletonCard />
      ) : (
        <ProfileForm user={user}>
          <ModalTriggerButton color="primary" size="sm" loginRequired text="프로필 편집">
            <ProfileEditModal />
          </ModalTriggerButton>
        </ProfileForm>
      )}
    </section>
  );
}

export default React.memo(MyProfilePage);
