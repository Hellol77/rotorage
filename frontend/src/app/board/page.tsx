"use client";
import React, { useContext } from "react";
import BoardGrid from "@/components/board/grid/BoardGrid";
import UploadModal from "@/components/board/modal/uploadModal/UploadModal";
import ModalTriggerButton from "@/components/common/button/ModalTriggerButton";
import useRefreshScrollReset from "@/utils/useRefreshScrollReset";
import { UserDataContext } from "@/contexts/AuthContext";
import { useGetBoardPosts } from "@/hooks/queries/useGetBoardPosts";

export default function BoradPage() {
  useRefreshScrollReset();
  const { isPending } = useGetBoardPosts();
  return (
    <main className="z-1 h-full min-h-screen overflow-y-scroll px-6 pt-20 scrollbar-hide md:px-20   md:pt-36">
      <section className="relative flex flex-col items-center">
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
      </section>
    </main>
  );
}
