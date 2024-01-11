"use client";
import React, { useContext } from "react";

import { Avatar } from "@nextui-org/react";

import ModalTriggerButton from "@/components/common/button/ModalTriggerButton";
import ProfileEditModal from "@/components/profile/modal/ProfileEditModal";
import { UserData } from "@/types/user";

import ProfileInfoContainer from "../common/ui/container/ProfileInfoContainer";

export default function ProfileForm({ user }: { user: UserData }) {
  return (
    <>
      <h1 className="md:w-50 mb-4 flex w-full  font-Pretendard-SemiBold text-xl ">
        프로필
      </h1>
      <ProfileInfoContainer className="flex">
        <div>
          <Avatar
            isBordered
            className=" mr-8 h-20 w-20 md:h-36 md:w-36"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          />
        </div>
        <div className="flex w-full min-w-fit items-center justify-between">
          <div className="w-full min-w-fit">
            <span className=" font-Pretendard-SemiBold text-2xl">
              {user?.nickname}
            </span>
            <p className=" mt-2 text-sm text-[#c9cedc]">
              {user?.introduce === "loading"
                ? ""
                : user?.introduce || "한 줄 소개를 입력해주세요."}
            </p>
          </div>
          <ModalTriggerButton loginRequired text="프로필 편집">
            <ProfileEditModal />
          </ModalTriggerButton>
        </div>
      </ProfileInfoContainer>
    </>
  );
}
