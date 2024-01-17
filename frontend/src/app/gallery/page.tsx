import React from "react";

import MainContainer from "@/components/common/container/MainContainer";
import NextIcon from "@/components/common/icon/NextIcon";
import PrevIcon from "@/components/common/icon/PrevIcon";
import MotionImage from "@/components/common/ui/MotionImage";

import gallery1 from "../../../public/photo/gallery/gallery1.png";
import gallery10 from "../../../public/photo/gallery/gallery10.png";
import gallery11 from "../../../public/photo/gallery/gallery11.png";
import gallery2 from "../../../public/photo/gallery/gallery2.png";
import gallery3 from "../../../public/photo/gallery/gallery3.png";
import gallery4 from "../../../public/photo/gallery/gallery4.png";
import gallery5 from "../../../public/photo/gallery/gallery5.png";
import gallery6 from "../../../public/photo/gallery/gallery6.png";
import gallery7 from "../../../public/photo/gallery/gallery7.png";
import gallery8 from "../../../public/photo/gallery/gallery8.png";
import gallery9 from "../../../public/photo/gallery/gallery9.png";

export default function GalleryPage() {
  return (
    <MainContainer>
      <section className="relative mx-auto h-full w-screen">
        <div className="mb-6 text-2xl font-bold tracking-wider  md:mb-16  md:text-5xl md:tracking-widest">
          GALLERY
        </div>
        <div className="grid h-full  w-full  grid-cols-2 grid-rows-2 gap-2 md:gap-4">
          <MotionImage image={gallery1} gridSpanType="row-span-2" />
          <MotionImage image={gallery2} />
          <MotionImage image={gallery3} />
        </div>
        <div className="mt-2 grid h-full w-full grid-cols-3 grid-rows-3 gap-2 md:mt-4 md:gap-4">
          <MotionImage image={gallery7} gridSpanType="row-span-2" />
          <MotionImage image={gallery4} />
          <MotionImage image={gallery5} />
          <MotionImage image={gallery6} />
          <MotionImage image={gallery8} />
          <MotionImage image={gallery9} />
          <MotionImage image={gallery10} />
          <MotionImage image={gallery11} />
        </div>
        <div className="mb-6 mt-6 flex w-40 justify-between  md:mb-10 md:mt-10">
          <PrevIcon className=" cursor-pointer" />
          1/1
          <NextIcon className=" cursor-pointer" />
        </div>
      </section>
    </MainContainer>
  );
}
