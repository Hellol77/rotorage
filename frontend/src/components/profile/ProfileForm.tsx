"use client";
import React, { ReactNode, useContext } from "react";

import { UserData } from "@/types/user";

import ProfileAvatar from "../common/avatar/ProfileAvatar";
import ProfileInfoContainer from "../common/container/ProfileInfoContainer";

export default function ProfileForm({ children, user }: { children?: ReactNode; user: UserData }) {
  return (
    <>
      <ProfileInfoContainer className="flex w-full min-w-fit dark:bg-[#18181b]">
        <div className="h-full">
          <ProfileAvatar size="large" className="mr-8" />
        </div>
        <div className=" flex w-full min-w-fit items-center justify-between">
          <div className="w-full min-w-fit">
            <span className=" font-Pretendard-SemiBold text-2xl">{user?.nickname}</span>
            <p className=" mt-2 text-sm text-[#c9cedc]">
              {user?.introduce === "loading"
                ? ""
                : user?.introduce || "한줄 자기소개를 작성해보세요."}
            </p>
          </div>
          {children}
        </div>
      </ProfileInfoContainer>
    </>
  );
}
