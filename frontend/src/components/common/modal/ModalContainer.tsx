"use client";
import React, { ReactNode } from "react";

import CloseIcon from "@/components/common/icon/CloseIcon";
import useScrollFixed from "@/utils/useScrollFixed";
import { motion } from "framer-motion";

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape" && handleModalClose) {
      handleModalClose();
    }
    console.log("erewrew");
  };

  return (
    <>
      {onClick && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={handleModalClose}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="fixed left-0 top-0 z-50 h-screen w-screen overflow-hidden bg-[#101010] opacity-20"
          >
            {handleModalClose && (
              <div
                className="absolute right-1  top-2 z-[60]  hidden h-10  w-10 cursor-pointer items-center justify-center md:flex"
                onClick={handleModalClose}
                onKeyDown={handleKeyDown}
              >
                <CloseIcon size="24" className=" stroke-white" />
              </div>
            )}
          </motion.div>
          {children}
        </>
      )}
    </>
  );
}
