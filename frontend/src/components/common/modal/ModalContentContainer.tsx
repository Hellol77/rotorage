import React, { ReactNode } from "react";

// import { Button } from "@nextui-org/react";
import DefaultButton from "@/components/common/button/DefaultButton";
import { motion } from "framer-motion";

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
      className={` absolute z-50 m-auto  flex  h-fit  w-fit flex-col  items-center  justify-center  rounded-xl  bg-black px-8 pb-8 ${className}`}
    >
      {children}
      <div className="mt-4  flex h-9 w-full items-center justify-center gap-2 font-poorStory">
        <DefaultButton
          onClick={handleCloseOnClick}
          color="default"
          className="w-full"
          text="닫기"
        />
        <DefaultButton
          color="primary"
          onClick={handleSubmit}
          className="w-full"
          disabled={disabled}
          text={submitText}
        />
      </div>
    </motion.div>
  );
}
