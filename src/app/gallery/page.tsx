"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import gallery1 from "/public/photo/gallery/gallery1.png";
import gallery2 from "/public/photo/gallery/gallery2.png";
import gallery3 from "/public/photo/gallery/gallery3.png";
import gallery4 from "/public/photo/gallery/gallery4.png";
import gallery5 from "/public/photo/gallery/gallery5.png";
import gallery6 from "/public/photo/gallery/gallery6.png";
import gallery7 from "/public/photo/gallery/gallery7.png";
import gallery8 from "/public/photo/gallery/gallery8.png";
import gallery9 from "/public/photo/gallery/gallery9.png";
import gallery10 from "/public/photo/gallery/gallery10.png";
import gallery11 from "/public/photo/gallery/gallery11.png";
import MotionImage from "../ui/MotionImage";
export default function PhotoPage() {
  return (
    // <motion.div
    //   className="h-[200px] w-[200px] rounded-sm bg-red-500"
    //   initial={{ opacity: 0, scale: 0.5 }}
    //   animate={{ opacity: 1, scale: 1 }}
    //   transition={{
    //     duration: 0.8,
    //     delay: 0.5,
    //     ease: [0, 0.71, 0.2, 1.01],
    //   }}
    // />
    <main className="z-1 h-full overflow-x-hidden overflow-y-scroll px-6 scrollbar-hide md:snap-mandatory md:px-20">
      <section className="flex flex-col items-center ">
        <div className="mb-6 mt-20 text-2xl font-bold tracking-wider  md:mb-16 md:mt-40 md:text-5xl md:tracking-widest">
          GALLERY
        </div>
        <div className="grid h-full  w-full  grid-cols-2 grid-rows-2 gap-2 md:gap-4">
          <motion.div
            className="row-span-2 h-full "
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src={gallery1}
              className="row-span-2 h-full object-cover"
              alt="1"
            />
          </motion.div>
          {/* <MotionImage className="row-span-2 h-full" /> */}
          <Image
            src={gallery2}
            className=" col-span-1 row-span-1 h-full object-cover"
            alt="1"
          />
          <Image
            src={gallery3}
            className=" col-span-1 row-span-1 h-full object-cover"
            alt="1"
          />
        </div>
        <div className="mt-2 grid h-full w-full grid-cols-3 grid-rows-3 gap-2 md:mt-4 md:gap-4">
          <Image
            src={gallery7}
            className="row-span-2 h-full object-cover"
            alt="1"
          />
          <Image src={gallery4} className=" h-full object-cover" alt="1" />
          <Image src={gallery5} className=" h-full object-cover" alt="1" />
          <Image src={gallery6} className=" h-full object-cover" alt="1" />
          <Image src={gallery8} className="  h-full object-cover" alt="1" />
          <Image src={gallery9} className="  h-full object-cover" alt="1" />
          <Image src={gallery10} className=" h-full   object-cover" alt="1" />
          <Image src={gallery11} className="  h-full  object-cover" alt="1" />
        </div>
      </section>
    </main>
  );
}
