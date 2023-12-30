import React from "react";

import BoardGrid from "@/components/board/grid/BoardGrid";
import UploadModal from "@/components/board/modal/uploadModal/UploadModal";
import ModalTriggerButton from "@/components/board/modal/button/ModalTriggerButton";

export default function BoradPage() {
  return (
    <main className="z-1 h-full min-h-screen overflow-y-scroll px-6 pt-20 scrollbar-hide md:px-20   md:pt-36">
      <section className="relative flex flex-col items-center">
        <div className="mb-6  flex w-full items-center justify-between    md:mb-16  ">
          <div className="text-2xl font-bold tracking-wider md:text-5xl md:tracking-widest">
            Board
          </div>
          <ModalTriggerButton
            loginRequired
            content="uploadIcon"
            text={"등록하기"}
          >
            <UploadModal />
          </ModalTriggerButton>
        </div>
        <BoardGrid />
      </section>
    </main>
  );
}
