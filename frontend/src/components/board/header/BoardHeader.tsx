"use client";
import React from "react";

import ModalTriggerButton from "@/components/common/button/ModalTriggerButton";
import UploadModal from "@/components/modalTemplate/uploadModal/UploadModal";
import { useGetBoardPosts } from "@/hooks/queries/useGetBoardPosts";
import { useUploadBoardPost } from "@/hooks/queries/useUploadBoardPost";

export default function BoardHeader() {
  const { isPending } = useGetBoardPosts();
  const { mutateAsync } = useUploadBoardPost();
  return (
    <div className="mb-6  flex w-full items-center justify-between    md:mb-16  ">
      <div className="text-xl font-bold tracking-wider md:text-3xl md:tracking-widest">Board</div>
      <ModalTriggerButton
        color="primary"
        loginRequired
        content="uploadIcon"
        size="sm"
        text={"등록하기"}
        isLoading={isPending}
      >
        <UploadModal submitMutate={mutateAsync} />
      </ModalTriggerButton>
    </div>
  );
}
