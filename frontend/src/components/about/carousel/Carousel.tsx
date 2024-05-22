"use client";
import * as React from "react";
import { useState } from "react";

import { wrap } from "popmotion";

import CarouselButton from "@/components/about/carousel/CarouselButton";
import { AnimatePresence, motion } from "framer-motion";
import { StaticImageData } from "next/image";

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

export const Carousel = ({ images }: { images: StaticImageData[] }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
      <div className="relative mb-8 h-[80vh] bg-[#101010] md:fixed md:bottom-0  md:left-1/2 md:z-10 md:mb-0  md:hidden md:justify-center md:bg-transparent md:pt-4">
        <div className="absolute bottom-0 z-30 flex h-[40vh] w-screen bg-transparent bg-gradient-to-b from-transparent from-[1%] to-[#101010] md:hidden" />
        {/* <div className="absolute top-0 z-30 flex h-[10vh] w-screen bg-transparent bg-gradient-to-t from-transparent from-[1%] to-[#101010] md:hidden" /> */}
        <div className=" md:flex md:justify-center  ">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={images[imageIndex].src}
              className="absolute z-0 h-full w-screen object-cover md:bottom-0 md:h-[90vh] md:w-[40vw]  md:max-w-[80vw] "
              src={images[imageIndex].src}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 30 },
                opacity: { duration: 0.1 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            />
          </AnimatePresence>
          <div className="relative top-64 z-50 flex select-none   justify-between fill-slate-200 stroke-slate-200 text-lg font-bold md:fixed  md:top-80  md:w-screen">
            <CarouselButton
              paginate={() => paginate(-1)}
              direction={false}
              className="right-20 top-40"
            />
            <CarouselButton
              paginate={() => paginate(1)}
              direction={true}
              className=" right-0 top-80"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
