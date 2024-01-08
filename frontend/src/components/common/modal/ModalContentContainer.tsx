import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";

export function ModalContentContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      key={"modal"}
      //   initial={{ opacity: 0 }}
      //   animate={{ opacity: 1 }}
      //   exit={{ opacity: 0 }}
      className={`${className} absolute -top-20 left-0 right-0 z-50  m-auto  flex h-fit  w-fit  flex-col  items-center  justify-center rounded-xl bg-black`}
    >
      {children}
    </motion.div>
  );
}

export function ModalEditContentContainer({
  children,
  handleCloseOnClick,
  handleSubmit,
  submitText,
  className,
  disabled,
}: {
  children: ReactNode;
  handleCloseOnClick: () => void;
  handleSubmit: () => void;
  submitText: string;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <motion.div
      key={"modal"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={` absolute  z-50  m-auto  flex h-fit  w-fit  flex-col  items-center  justify-center rounded-xl bg-black ${className}`}
    >
      {children}
      <div className="mb-3 flex  w-full items-center justify-center gap-2 px-4 font-poorStory">
        <Button
          onClick={handleCloseOnClick}
          color="default"
          size="md"
          className="w-full"
        >
          닫기
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          size="md"
          className="w-full"
          isDisabled={disabled}
        >
          {submitText}
        </Button>
      </div>
    </motion.div>
  );
}
