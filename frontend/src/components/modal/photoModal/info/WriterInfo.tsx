import React from "react";

import ProfileAvatar from "@/components/common/avatar/ProfileAvatar";
import CloseIcon from "@/components/common/icon/CloseIcon";
import DotsHorizontalIcon from "@/components/common/icon/DotsHorizontalIcon";
import { PostUserType, UserData } from "@/types/user";
import { relativeDate } from "@/utils/relativeDate";

export default function WriterInfo({
  createdAt,
  user,
  isMobile = false,
  profileImage,
}: {
  createdAt: Date;
  user: PostUserType;
  isMobile?: boolean;
  profileImage?: string;
}) {
  return (
    <div
      className={` ${isMobile ? "flex md:hidden" : "hidden md:flex"} pl-3 pr-2 md:w-[400px] md:flex-col`}
    >
      <div className=" flex  h-fit w-full  py-2 ">
        <div className="flex w-full items-center">
          <ProfileAvatar size="medium" />
          <div className="ml-3 flex w-full items-center justify-center ">
            <div className="flex w-full flex-col justify-between font-poorStory text-2xl tracking-wide">
              <span>{user.nickname}</span>
              <time className="ml-2 font-poorStory text-xs tracking-wide">
                {relativeDate(createdAt)}
              </time>
            </div>
          </div>
          <div className="flex h-fit flex-col items-center justify-center">
            <CloseIcon size="20" className=" mt-2 stroke-white md:hidden" />
            <DotsHorizontalIcon size="32" />
          </div>
        </div>
      </div>
    </div>
  );
}
{
  /* <div
className="absolute right-1  top-2 z-[60]   h-10  w-10 cursor-pointer items-center justify-center md:flex"
onClick={() => {}}
>
<CloseIcon size="24" className=" stroke-white" />
</div> */
}
