import React, { ReactNode, useState } from "react";
import { Button } from "@nextui-org/react";
import UploadIcon from "@/app/icon/UploadIcon";

export default function ModalTriggerButton({
  text,
  children,
  setOnClick,
}: {
  text: string;
  children: ReactNode;
  setOnClick: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleOnClick = () => {
    setOnClick(true);
  };
  return (
    <>
      <Button
        className=" flex items-center justify-center font-poorStory"
        size="lg"
        endContent={<UploadIcon color="white" className="h-4 w-4" />}
        variant="bordered"
        color="default"
        onClick={handleOnClick}
      >
        {text}
      </Button>
      {children}
    </>
  );
}
