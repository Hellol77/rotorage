import React from "react";

import ProfileAvatar from "@/components/common/avatar/ProfileAvatar";
import ModalTriggerButton from "@/components/common/button/ModalTriggerButton";
import CloseIcon from "@/components/common/icon/CloseIcon";
import MoreModal from "@/components/modal/moreModal/MoreModal";
import { PostUserType } from "@/types/user";
import { relativeDate } from "@/utils/relativeDate";

export default function WriterInfo({
  createdAt,
  user,
  handleModalClose,
  profileImage,
}: {
  createdAt: Date;
  user: PostUserType;
  handleModalClose?: () => void;
  profileImage?: string;
}) {
  return (
    <div className={`z-40 pl-5   md:flex-col`}>
      <div className=" flex  h-fit w-full  py-2 ">
        <div className="flex w-full items-center">
          <ProfileAvatar size="small" />
          <div className="ml-3 flex w-full items-center justify-center ">
            <div className="flex w-full flex-col justify-between font-poorStory  tracking-wide">
              <span className="text-lg">{user.nickname}</span>
              <time className="font-poorStory text-xs tracking-wide text-gray-400">
                {relativeDate(createdAt)}
              </time>
            </div>
          </div>
          <div className="flex h-fit flex-col items-center justify-center">
            <CloseIcon size="20" className=" mt-2 md:hidden" onClick={handleModalClose} />
            <ModalTriggerButton content="more">
              <MoreModal />
            </ModalTriggerButton>
          </div>
        </div>
      </div>
    </div>
  );
}
