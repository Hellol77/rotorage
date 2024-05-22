import React, { useContext, useState } from "react";

import DefaultButton from "@/components/common/button/DefaultButton";
import { ModalContentContainer } from "@/components/common/modal/ModalContentContainer";
import UploadModal from "@/components/modalTemplate/uploadModal/UploadModal";
import { UserDataContext } from "@/contexts/AuthContext";
import { useModalTriggerButtonContext } from "@/contexts/ModalTriggerButton.context";
import useDeleteComment from "@/hooks/queries/useDeleteComment";
import useDeletePost from "@/hooks/queries/useDeletePost";
import useEditPost from "@/hooks/queries/useEditPost";
import useReportComment from "@/hooks/queries/useReportComment";
import useReportPost from "@/hooks/queries/useReportPost";
import { Post } from "@/types/post";
import { PostUserType } from "@/types/user";
import Link from "next/link";

export default function MoreModal({
  targetUser,
  targetId,
  type,
  post,
}: {
  targetUser: PostUserType;
  targetId: string;
  type: "post" | "comment";
  post?: Post;
}) {
  const { onClick, handleCloseOnClick } = useModalTriggerButtonContext();
  const { user } = useContext(UserDataContext);
  const [confirmString, setConfirmString] = useState<string>("");
  const { mutate: mutateDeletePost } = useDeletePost();
  const { mutate: mutateDeleteComment } = useDeleteComment();
  const { mutate: mutateReportPost } = useReportPost();
  const { mutate: mutateReportComment } = useReportComment();
  const { mutateAsync } = useEditPost(post ? post._id : "");
  const handleOnClick = (text: string) => {
    setConfirmString(text);
  };
  const handleMoreModalClose = () => {
    setConfirmString("");
    handleCloseOnClick();
  };

  const handleCloseConfirm = () => {
    setConfirmString("");
  };
  const handleMutateConfirm = (confirmString: string) => {
    handleMoreModalClose();
    if (confirmString === "삭제" && type === "post") {
      mutateDeletePost(targetId);
      return;
    }
    if (confirmString === "삭제" && type === "comment") {
      mutateDeleteComment(targetId);
      return;
    }
    if (confirmString === "신고" && type === "post") {
      mutateReportPost(targetId);
    }
    if (confirmString === "신고" && type === "comment") {
      mutateReportComment(targetId);
      // 댓글 신고 mutate
    }
  };
  return (
    <>
      {onClick && (
        <section
          onClick={handleMoreModalClose}
          className="fixed left-0 top-0 z-[60] h-screen w-screen cursor-default overflow-hidden bg-[#101010] bg-opacity-70"
        >
          <ModalContentContainer className=" text-md top-40 z-[60] h-fit w-[60%] justify-center bg-[#262626] text-center md:w-60">
            {!confirmString || confirmString === "수정" ? (
              <>
                {targetUser._id !== user._id && (
                  <button
                    onClick={() => handleOnClick("신고")}
                    className="h-12 w-full rounded-t-xl   text-red-500 hover:bg-[#383838]"
                  >
                    신고
                  </button>
                )}
                {(user.type === "admin" || targetUser._id === user._id) && (
                  <>
                    <button
                      onClick={() => handleOnClick("삭제")}
                      className="h-12 w-full rounded-xl  text-red-500 hover:bg-[#383838]"
                    >
                      삭제
                    </button>
                    {type === "post" && (
                      <>
                        <button
                          onClick={() => handleOnClick("수정")}
                          className="h-12 w-full rounded-xl  hover:bg-[#383838]"
                        >
                          수정
                        </button>
                        {confirmString === "수정" && (
                          <UploadModal
                            submitMutate={mutateAsync}
                            beforePost={post}
                            handleMoreModalClose={handleMoreModalClose}
                          />
                        )}
                      </>
                    )}
                  </>
                )}
                <Link
                  href={`/profile/?id=${targetUser._id}`}
                  className="flex  h-12 w-full items-center justify-center rounded-xl    text-center hover:bg-[#383838]"
                >
                  사용자 정보
                </Link>
              </>
            ) : (
              <>
                <h1 className="flex h-14 items-center justify-center">
                  {confirmString}하시겠습니까?
                </h1>
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
        </section>
      )}
    </>
  );
}
