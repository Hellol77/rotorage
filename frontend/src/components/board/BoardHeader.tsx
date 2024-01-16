"use client";
import React from "react";

import ModalTriggerButton from "@/components/common/button/ModalTriggerButton";
import UploadModal from "@/components/modal/uploadModal/UploadModal";
import { useGetBoardPosts } from "@/hooks/queries/useGetBoardPosts";

export default function BoardHeader() {
  const { isPending } = useGetBoardPosts();

  return (
    <div className="mb-6  flex w-full items-center justify-between    md:mb-16  ">
      <div className="text-xl font-bold tracking-wider md:text-3xl md:tracking-widest">Board</div>
      <ModalTriggerButton
        loginRequired
        content="uploadIcon"
        text={"등록하기"}
        isLoading={isPending}
      >
        <UploadModal />
      </ModalTriggerButton>
    </div>
  );
}
