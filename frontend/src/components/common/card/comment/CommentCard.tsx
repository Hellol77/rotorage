import React, { ReactNode } from "react";

import ProfileAvatar from "@/components/common/avatar/ProfileAvatar";
import ModalTriggerButton from "@/components/common/button/ModalTriggerButton";
import { relativeDate } from "@/utils/relativeDate";

export default function CommentCard({
  commentUserNickname,
  commentContent,
  commentCreatedAt,
  commentProfileImage,
  children,
}: {
  commentUserNickname: string;
  commentContent: string;
  commentCreatedAt: Date;
  commentProfileImage?: File | string;
  children: ReactNode;
}) {
  return (
    <ul className="flex w-full flex-shrink-0 pt-5">
      <ProfileAvatar size="small" profileImage={commentProfileImage} />
      <div className="ml-3 w-full">
        <div className="w-fit whitespace-normal text-lg leading-4">
          {commentUserNickname}&nbsp;&nbsp;&nbsp;
          <span className="w-full whitespace-normal break-all font-Pretendard-Regular text-sm">
            {commentContent}
          </span>
        </div>

        <div className="mt-2 text-xs tracking-wide text-gray-400">
          {relativeDate(commentCreatedAt)}
        </div>
      </div>
      <ModalTriggerButton content="more">{children}</ModalTriggerButton>
    </ul>
  );
}
