"use client";
import React, { ReactNode, useContext } from "react";

import { Avatar } from "@nextui-org/react";

import { UserData } from "@/types/user";

import ProfileInfoContainer from "../common/ui/container/ProfileInfoContainer";

export default function ProfileForm({
  children,
  user,
}: {
  children?: ReactNode;
  user: UserData;
}) {
  return (
    <>
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
                : user?.introduce || "한줄 자기소개를 작성해보세요."}
            </p>
          </div>
          {children}
        </div>
      </ProfileInfoContainer>
    </>
  );
}
