import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { StaticImageData } from "next/image";
import CarouselButton from "./CarouselButton";

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
const swipePower = (offset: number, velocity: number) =>
  Math.abs(offset) * velocity;

export const Carousel = ({ images }: { images: StaticImageData[] }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    console.log(page);
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
      <div className="relative flex h-screen items-center justify-center md:w-1/2">
        <AnimatePresence initial={false} custom={direction}>
          <div className="absolute bottom-0 z-30  flex h-[40vh] w-screen bg-transparent bg-gradient-to-b from-transparent from-[1%] to-[#101010] md:hidden" />
          <div className="absolute top-0 z-30 flex h-[10vh] w-screen bg-transparent bg-gradient-to-t from-transparent from-[1%] to-[#101010] md:hidden" />
          <motion.img
            key={page}
            className=" absolute z-30 h-screen w-screen object-cover opacity-30 md:h-[80vh] md:w-[40vw] md:rounded-3xl "
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
        <CarouselButton
          paginate={() => paginate(1)}
          direction={true}
          className="top-100 right-0"
        />
        <CarouselButton
          paginate={() => paginate(-1)}
          direction={false}
          className="top-100 left-0"
        />
      </div>
    </>
  );
};
