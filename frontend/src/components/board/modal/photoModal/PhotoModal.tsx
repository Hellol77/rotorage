"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

export default function PhotoModal({
  children,
  handleModalClose,
  ...props
}: {
  children: ReactNode;
  handleModalClose: () => void;
}) {

  return (
    <>
      <motion.div
        key="photoModal-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        exit={{ opacity: 0 }}
        onClick={handleModalClose}
        className=" fixed left-0 top-0 z-40 h-screen w-screen overflow-hidden bg-[#101010] opacity-20"
      ></motion.div>
      {children}
    </>
  );
}
