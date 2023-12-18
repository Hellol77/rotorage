import React from "react";

import ModalTriggerButton from "../../components/board/modal/button/ModalTriggerButton";
import UploadModal from "../../components/board/modal/UploadModal";
import BoardGrid from "@/components/board/grid/BoardGrid";

export default function BoradPage() {
  return (
    <main className="z-1 relative h-full min-h-screen overflow-x-hidden overflow-y-scroll px-6 scrollbar-hide  md:px-20">
      <section className="relative flex flex-col items-center ">
        <div className="mb-6 mt-20 flex w-full items-center justify-between    md:mb-16 md:mt-40 ">
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
