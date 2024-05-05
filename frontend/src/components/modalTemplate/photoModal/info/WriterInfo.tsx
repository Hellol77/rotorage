import React from "react";

import ProfileAvatar from "@/components/common/avatar/ProfileAvatar";
import ModalTriggerButton from "@/components/common/button/ModalTriggerButton";
import CloseIcon from "@/components/common/icon/CloseIcon";
import MoreModal from "@/components/modalTemplate/moreModal/MoreModal";
import { Post } from "@/types/post";
import { PostUserType } from "@/types/user";
import { relativeDate } from "@/utils/relativeDate";

export default function WriterInfo({
  createdAt,
  user,
  handleModalClose,
  post,
}: {
  createdAt: Date;
  user: PostUserType;
  handleModalClose?: () => void;
  post: Post;
}) {
  const { nickname, profileImage } = user;
  return (
    <div className={`z-40 py-1 pl-5 md:flex-col  md:py-3`}>
      <div className=" flex  h-fit w-full  md:py-2 ">
        <div className="flex w-full items-center">
          <ProfileAvatar size="small" profileImage={profileImage} />
          <div className="ml-3 flex w-full items-center justify-center ">
            <div className="flex w-full flex-col justify-between font-poorStory  tracking-wide">
              <span className="text-lg">{nickname}</span>
              <time className="font-poorStory text-xs tracking-wide text-gray-400">
                {relativeDate(createdAt)}
              </time>
            </div>
          </div>
          <div className="flex h-fit flex-col items-center justify-center">
            <CloseIcon size="20" className=" mt-2 md:hidden" onClick={handleModalClose} />
            <ModalTriggerButton loginRequired content="more">
              <MoreModal post={post} targetId={post._id} type="post" targetUser={user} />
            </ModalTriggerButton>
          </div>
        </div>
      </div>
    </div>
  );
}
