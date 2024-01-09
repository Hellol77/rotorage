"use client";

import React from "react";

import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

export default function MotionImage({
  image,
  gridSpanType,
}: {
  image: StaticImageData;
  gridSpanType?: string;
}) {
  return (
    <motion.div
      className={`${gridSpanType} h-full`}
      whileHover={{ scale: 1.02 }}
    >
      <Image
        src={image}
        className="h-full w-full object-cover"
        alt={`${image}`}
      />
    </motion.div>
  );
}
