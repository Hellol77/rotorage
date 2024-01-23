import React, { useContext, useState } from "react";

import DefaultButton from "@/components/common/button/DefaultButton";
import ModalContainer from "@/components/common/modal/ModalContainer";
import { ModalContentContainer } from "@/components/common/modal/ModalContentContainer";
import { UserDataContext } from "@/contexts/AuthContext";
import { useModalTriggerButtonContext } from "@/contexts/ModalTriggerButton.context";
import useDeleteComment from "@/hooks/queries/useDeleteComment";
import useDeletePost from "@/hooks/queries/useDeletePost";
import { PostUserType } from "@/types/user";
import Link from "next/link";

export default function MoreModal({
  targetUser,
  targetId,
  type,
}: {
  targetUser: PostUserType;
  targetId: string;
  type: "post" | "comment";
}) {
  const { onClick, handleCloseOnClick } = useModalTriggerButtonContext();
  const { user } = useContext(UserDataContext);
  const [confirmString, setConfirmString] = useState<string>("");
  const { mutate: mutateDeletePost } = useDeletePost();
  const { mutate: mutateDeleteComment } = useDeleteComment();
  const handleOnClick = (text: string) => {
    setConfirmString(text);
  };
  const handleModalClose = () => {
    setConfirmString("");
    handleCloseOnClick();
  };
  const handleCloseConfirm = () => {
    setConfirmString("");
  };
  const handleMutateConfirm = (confirmString: string) => {
    handleModalClose();
    if (confirmString === "삭제" && type === "post") {
      mutateDeletePost(targetId);
      return;
    }
    if (confirmString === "삭제" && type === "comment") {
      //댓글 삭제 mutate
      mutateDeleteComment(targetId);
      return;
    }
    if (confirmString === "신고") {
      //신고하기 mutate
    }
  };
  return (
    <ModalContainer onClick={onClick} handleModalClose={handleModalClose}>
      <ModalContentContainer className=" text-md z-[60] h-fit w-[90%] justify-center bg-[#262626] text-center md:w-60">
        {!confirmString ? (
          <>
            <button
              onClick={() => handleOnClick("신고")}
              className="h-12 w-full rounded-t-xl border-b-[1px] border-gray-400 text-red-500 hover:bg-[#383838]"
            >
              신고
            </button>
            {targetUser._id === user._id && (
              <>
                <button
                  onClick={() => handleOnClick("삭제")}
                  className="h-12 w-full border-gray-400 text-red-500 hover:bg-[#383838]"
                >
                  삭제
                </button>
                {type === "post" && (
                  <button className="h-12 w-full border-b-[1px] border-t-[1px] border-gray-400 hover:bg-[#383838]">
                    수정
                  </button>
                )}
              </>
            )}
            <Link
              href={`/profile/${targetUser._id}`}
              className="flex h-12 w-full items-center justify-center  rounded-b-xl border-gray-400  text-center hover:bg-[#383838]"
            >
              사용자 정보
            </Link>
          </>
        ) : (
          <>
            <h1 className="flex h-14 items-center justify-center">{confirmString}하시겠습니까?</h1>
            <div className="flex h-10">
              <DefaultButton text="취소" className="w-full" onClick={handleCloseConfirm} />
              <DefaultButton
                color="danger"
                className="w-full"
                text={confirmString}
                onClick={() => handleMutateConfirm(confirmString)}
              />
            </div>
          </>
        )}
      </ModalContentContainer>
    </ModalContainer>
  );
}
