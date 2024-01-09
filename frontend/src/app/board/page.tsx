"use client";
import React from "react";

import BoardGrid from "@/components/board/grid/BoardGrid";
import UploadModal from "@/components/board/modal/uploadModal/UploadModal";
import ModalTriggerButton from "@/components/common/button/ModalTriggerButton";
import MainContainer from "@/components/common/ui/container/MainContainer";
import { useGetBoardPosts } from "@/hooks/queries/useGetBoardPosts";
import useRefreshScrollReset from "@/utils/useRefreshScrollReset";

export default function BoradPage() {
  useRefreshScrollReset();
  const { isPending } = useGetBoardPosts();
  return (
    <MainContainer>
      <div className="mb-6  flex w-full items-center justify-between    md:mb-16  ">
        <div className="text-xl font-bold tracking-wider md:text-3xl md:tracking-widest">
          Board
        </div>
        <ModalTriggerButton
          loginRequired
          content="uploadIcon"
          text={"등록하기"}
          isLoading={isPending}
        >
          <UploadModal />
        </ModalTriggerButton>
      </div>
      <BoardGrid />
    </MainContainer>
  );
}
