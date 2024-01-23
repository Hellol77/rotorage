import React, { useContext } from "react";

import ModalContainer from "@/components/common/modal/ModalContainer";
import { ModalContentContainer } from "@/components/common/modal/ModalContentContainer";
import { UserDataContext } from "@/contexts/AuthContext";
import { useModalTriggerButtonContext } from "@/contexts/ModalTriggerButton.context";
import { PostUserType } from "@/types/user";
import Link from "next/link";

export default function MoreModal({ targetUser }: { targetUser: PostUserType }) {
  const { onClick, handleCloseOnClick } = useModalTriggerButtonContext();
  const { user } = useContext(UserDataContext);
  return (
    <ModalContainer onClick={onClick} handleModalClose={handleCloseOnClick}>
      <ModalContentContainer className=" text-md z-[60] h-fit w-[90%] justify-center bg-[#262626] text-center md:w-60">
        <button className="h-12 w-full border-b-[1px] border-gray-400 text-red-500">신고</button>
        <Link
          href={`/profile/${targetUser._id}`}
          className="flex h-12 w-full items-center justify-center  border-gray-400 text-center  "
        >
          사용자 정보
        </Link>
        {targetUser._id === user._id && (
          <>
            <button className="h-12 w-full border-b-[1px] border-t-[1px] border-gray-400">
              수정
            </button>
            <button className="h-12 w-full  border-gray-400">삭제</button>
          </>
        )}
      </ModalContentContainer>
    </ModalContainer>
  );
}
