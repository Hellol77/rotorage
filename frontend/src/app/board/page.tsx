"use client";
import React, { useState } from "react";

import gallery3 from "/public/photo/gallery/gallery3.png";
import gallery5 from "/public/photo/gallery/gallery5.png";
import gallery11 from "/public/photo/gallery/gallery11.png";
import gif1 from "/public/photo/gallery/gif1.gif";
import BoardPhotoCard from "../../components/card/BoardPhotoCard";
import ModalTriggerButton from "../../components/button/ModalTriggerButton";
import UploadModal from "../../components/modal/UploadModal";
import BoardGrid from "@/components/card/BoardGrid";
export default function BoradPage() {
  const [onClick, setOnClick] = useState(false);

  return (
    <main className="z-1 relative h-full min-h-screen overflow-x-hidden overflow-y-scroll px-6 scrollbar-hide  md:px-20">
      <section className="relative flex flex-col items-center ">
        <div className="mb-6 mt-20 flex w-full items-center justify-between    md:mb-16 md:mt-40 ">
          <div className="text-2xl font-bold tracking-wider md:text-5xl md:tracking-widest">
            Board
          </div>
          <ModalTriggerButton text={"등록하기"} setOnClick={setOnClick}>
            <UploadModal setOnClick={setOnClick} onClick={onClick} />
          </ModalTriggerButton>
        </div>
        {/* <div className="   grid  grid-cols-2 gap-5 md:w-full md:grid-cols-4 md:gap-4">
          <BoardPhotoCard
            image={gallery5}
            title={"자색고구마로로"}
            content="생일 축하해!qwdqwdwqdwqdwqdwqdqwqwdqwwqwqdqwdqwdwqdqwd"
            id={"1"}
          />
          <BoardPhotoCard
            image={gif1}
            title={"자색고구마로로"}
            content="생일 축하해!qwdqwdwqdwqdwqdwqdqwqwdqwwqwqdqwdqwdwqdqwd"
            id={"2"}
          />
          <BoardPhotoCard
            image={gallery3}
            title={"자색고구마로로"}
            content="생일 축하해!qwdqwdwqdwqdwqdwqdqwqwdqwwqwqdqwdqwd생일 "
            id={"3"}
          />
          <BoardPhotoCard
            image={gallery3}
            title={"자색고구마로로"}
            content="생일 축하해!qwdqwdwqdwqdwqdwqdqwqwdqwwqwqdqwdqwdwqdqwd"
            id={"4"}
          />
        </div> */}
        <BoardGrid />
      </section>
    </main>
  );
}
