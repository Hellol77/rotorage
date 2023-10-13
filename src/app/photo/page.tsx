"use client";
import React from "react";
import { motion } from "framer-motion";

export default function PhotoPage() {

  return (
    <motion.div
      className="h-[200px] w-[200px] rounded-sm bg-red-500"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    />
  );
}
