import React from "react";

import ProfileAvatar from "@/components/common/avatar/ProfileAvatar";
import ModalTriggerButton from "@/components/common/button/ModalTriggerButton";
import { relativeDate } from "@/utils/relativeDate";

export default function CommentCard({
  commentUserNickname,
  commentContent,
  commentCreatedAt,
}: {
  commentUserNickname: string;
  commentContent: string;
  commentCreatedAt: Date;
}) {
  return (
    <ul className="flex w-full flex-shrink-0 pt-2">
      <ProfileAvatar size="small" />
      <div className="ml-3">
        <div className="text-lg leading-6">
          {commentUserNickname} &nbsp;
          <span className="whitespace-normal  font-Pretendard-Regular text-sm">
            {commentContent}
          </span>
        </div>
        <div className=" text-xs tracking-wide text-gray-400">{relativeDate(commentCreatedAt)}</div>
      </div>
      <ModalTriggerButton content="more">
        <div>sdx</div>
      </ModalTriggerButton>
    </ul>
  );
}
