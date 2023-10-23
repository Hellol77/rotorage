"use client";
import Image from "next/image";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import gallery3 from "/public/photo/gallery/gallery3.png";
import gallery5 from "/public/photo/gallery/gallery5.png";
import gallery11 from "/public/photo/gallery/gallery11.png";
import gif1 from "/public/photo/gallery/gif1.gif";
import { useRouter } from "next/navigation";
import BoardPhoto from "../components/modal/BoardPhoto";
export default function BoradPage() {
  return (
    <main className="z-1 relative h-full min-h-screen overflow-x-hidden overflow-y-scroll px-6 scrollbar-hide  md:px-20">
      <section className="relative flex flex-col items-center ">
        <div className="mb-6 mt-20 flex w-full items-center justify-between    md:mb-16 md:mt-40 ">
          <div className="text-2xl font-bold tracking-wider md:text-5xl md:tracking-widest">
            Board
          </div>
          <div>등록하기</div>
        </div>
        <div className="   grid  grid-cols-2 gap-5 md:w-full md:grid-cols-4 md:gap-4">
          {/* <motion.div className="relative h-44 w-40  md:h-[35vh]  md:w-[20vw]">
            <Image
              src={gif1}
              alt="1"
              className=" h-full w-full rounded-md object-cover"
            />
            <div className="absolute top-0 flex h-full w-full flex-col justify-end bg-transparent bg-gradient-to-b from-transparent from-[40%] to-[#101010] px-2 py-2 md:h-full md:w-full md:px-4 md:py-4">
              <div className="text-md truncate font-poorStory font-bold md:mb-1 md:text-2xl">
                자색고구마로로
              </div>
              <div className="flex-nowrap truncate  font-poorStory text-sm text-slate-200">
                생일 축하해!qwdqwdwqdwqdwqdwqdqwqwdqwwqwqdqwdqwdwqdqwd
              </div>
            </div>
          </motion.div> */}
          <BoardPhoto
            image={gallery5}
            title={"자색고구마로로"}
            content="생일 축하해!qwdqwdwqdwqdwqdwqdqwqwdqwwqwqdqwdqwdwqdqwd"
            id={"1"}
          />
          <BoardPhoto
            image={gif1}
            title={"자색고구마로로"}
            content="생일 축하해!qwdqwdwqdwqdwqdwqdqwqwdqwwqwqdqwdqwdwqdqwd"
            id={"2"}
          />
          <BoardPhoto
            image={gallery3}
            title={"자색고구마로로"}
            content="생일 축하해!qwdqwdwqdwqdwqdwqdqwqwdqwwqwqdqwdqwdwqdqwd"
            id={"3"}
          />
          <BoardPhoto
            image={gallery3}
            title={"자색고구마로로"}
            content="생일 축하해!qwdqwdwqdwqdwqdwqdqwqwdqwwqwqdqwdqwdwqdqwd"
            id={"4"}
          />
        </div>
      </section>
    </main>
  );
}
