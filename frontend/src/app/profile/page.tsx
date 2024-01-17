"use client";
import React, { useContext, useEffect } from "react";

import ModalTriggerButton from "@/components/common/button/ModalTriggerButton";
import ProfileSkeletonCard from "@/components/common/skeleton/ProfileSkeletonCard";
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
      <h1 className="md:w-50 mb-4 flex w-full  font-Pretendard-SemiBold text-xl">프로필</h1>

      {accessToken === "" ? (
        <ProfileSkeletonCard />
      ) : (
        <ProfileForm user={user}>
          <ModalTriggerButton loginRequired text="프로필 편집">
            <ProfileEditModal />
          </ModalTriggerButton>
        </ProfileForm>
      )}
    </section>
  );
}

export default React.memo(MyProfilePage);
