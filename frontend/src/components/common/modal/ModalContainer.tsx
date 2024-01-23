"use client";
import React, { ReactNode, useContext } from "react";

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
  };
  const handleCloseOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (handleModalClose) {
      handleModalClose();
    }
  };
  return (
    <>
      {onClick && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseOnClick}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="fixed left-0  top-0 z-[60] h-screen w-screen cursor-default overflow-hidden bg-[#101010] opacity-20"
          >
            {handleModalClose && (
              <div
                className="absolute right-1  top-2 z-[60]  hidden h-10  w-10 cursor-pointer items-center justify-center md:flex"
                onClick={handleCloseOnClick}
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
