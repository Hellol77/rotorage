"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import UploadIcon from "@/app/icon/UploadIcon";

export default function ModalTriggerButton({
  text,
  children,
}: {
  text: string;
  children: JSX.Element;
}) {
  const [onClick, setOnClick] = useState(false);
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
      {React.cloneElement(children, {
        setOnClick: setOnClick,
        onClick: onClick,
      })}
    </>
  );
}
