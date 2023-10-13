"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import hanroroLogo from "/public/HanroroLogoSVG.svg";
import { motion } from "framer-motion";

// 배열을 넣어서 누를때마다 사진 바뀌게
type Props = {
  image: StaticImageData[];
};

export default function CircleImage({ image }: Props) {
  return (
    <>
      <div className="flex h-full items-center justify-center ">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            ease: [0, 0.71, 0.2, 1.01],
            stiffness: 400,
            damping: 15,
          }}
          whileHover={{ scale: 1.1 }}
          className="absolute z-30 flex h-64 w-64 items-center justify-center rounded-full bg-[#323030] md:mt-10 md:h-[34rem] md:w-[34rem]"
        >
          <Image
            src={image[0]}
            priority
            className="absolute w-60	rounded-full md:w-[32rem]"
            alt="circlePhoto"
          />
          <Image
            src={hanroroLogo}
            className="relative left-16 top-24 z-40 w-20 md:left-40 md:top-60 md:w-48"
            alt={"logo"}
          />
        </motion.div>
      </div>
    </>
  );
}
