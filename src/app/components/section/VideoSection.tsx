"use client";

import React from "react";
import { Variants, delay, motion } from "framer-motion";

const cardVariants: Variants = {
  offscreen: {
    opacity: 1,
  },
  onscreen: {
    opacity: 0,
    transition: {
      duration: 1.2,
    },
  },
};
export default function VideoSection() {
  return (
    <motion.section
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: false, amount: 0.8 }}
      exit="offscreen"
      className="relative z-10 flex h-full w-screen snap-start overflow-x-hidden  overflow-y-hidden   "
    >
      <video
        className=" z-30 h-full overflow-y-hidden object-cover "
        src={require("/public//video/video1.mp4")}
        autoPlay
        muted
        playsInline
        loop
      ></video>
      <div className="absolute top-0 z-30 h-full w-screen bg-transparent bg-gradient-to-l from-transparent from-30% via-[#101010] to-[#101010]  md:from-5% md:via-100%" />
      <motion.div
        variants={cardVariants}
        className="absolute top-0 z-40 h-full w-screen bg-[#101010]"
      />
    </motion.section>
  );
}
