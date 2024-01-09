"use client";
import React, { ReactNode } from "react";

import { AnimatePresence, motion } from "framer-motion";

import useScrollFixed from "@/utils/useScrollFixed";

export default function ModalContainer({
  children,
  handleModalClose,
  onClick,
  ...props
}: {
  children: ReactNode;
  onClick: boolean;
  handleModalClose?: () => void;
}) {
  useScrollFixed(onClick);

  return (
    <>
      <AnimatePresence>
        {onClick && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={handleModalClose}
              className=" fixed left-0 top-0 z-40 h-screen w-screen overflow-hidden bg-[#101010] opacity-20"
            ></motion.div>
            {children}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
