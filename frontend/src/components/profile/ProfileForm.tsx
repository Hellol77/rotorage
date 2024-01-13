"use client";
import React, { ReactNode, useContext } from "react";

import { Avatar } from "@nextui-org/react";
import Image from "next/image";

import { UserData } from "@/types/user";

import gallery11 from "../../../public/photo/gallery/gallery11.png";
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
        <div className="h-full">
          <span
            tabIndex={-1}
            className=" relative z-10 mr-8 box-border flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-default align-middle text-tiny text-default-foreground outline-none ring-2 ring-default ring-offset-2 ring-offset-background data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus md:h-36 md:w-36"
          >
            <Image
              src={gallery11}
              className=" flex h-full w-full object-cover  transition-opacity !duration-500"
              alt="profile"
              width={144}
              height={144}
            />
          </span>
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
