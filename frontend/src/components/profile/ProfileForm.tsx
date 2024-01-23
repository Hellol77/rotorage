"use client";
import React, { ReactNode } from "react";

import { UserData } from "@/types/user";

import ProfileAvatar from "../common/avatar/ProfileAvatar";
import ProfileInfoContainer from "../common/container/ProfileInfoContainer";

export default function ProfileForm({ children, user }: { children?: ReactNode; user: UserData }) {
  return (
    <>
      <ProfileInfoContainer className="flex w-full min-w-fit p-4  dark:bg-[#18181b]">
        <div className="h-full"></div>
        <div className="ml-3 flex w-full min-w-fit flex-col  items-end  md:w-full md:flex-row md:items-center md:justify-between">
          <div className="mb-4 flex w-full min-w-fit items-center md:mb-0 ">
            <ProfileAvatar
              size="large"
              className="mr-4 md:mr-8"
              profileImage={user?.profileImage}
            />
            <div>
              <span className=" text-md font-Pretendard-SemiBold md:text-2xl">
                {user?.nickname}
              </span>
              <p className=" md:text-md mt-1 w-40 whitespace-normal break-all text-xs text-[#c9cedc] md:mt-2 md:w-full">
                {user?.introduce === "loading"
                  ? ""
                  : user?.introduce || "한줄 자기소개를 작성해보세요."}
              </p>
            </div>
          </div>
          {children}
        </div>
      </ProfileInfoContainer>
    </>
  );
}
