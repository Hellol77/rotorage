"use client";
import React, { useContext, useState } from "react";
import { Button } from "@nextui-org/react";
import UploadIcon from "@/components/common/icon/UploadIcon";
import PostMoreIcon from "@/components/common/icon/PostMoreIcon";
import { UserDataContext } from "@/contexts/AuthContext";

const ContentIcon = {
  uploadIcon: <UploadIcon color="white" className="h-4 w-4" />,
  postMoreIcon: <PostMoreIcon />,
};

export default function ModalTriggerButton({
  text,
  children,
  content,
  loginRequired = false,
}: {
  text: string;
  children: JSX.Element;
  content: keyof typeof ContentIcon;
  loginRequired: boolean;
}) {
  const userData = useContext(UserDataContext);
  const [onClick, setOnClick] = useState(false);
  const handleOnClick = () => {
    if (loginRequired && !userData?.user.userId) {
      alert("로그인이 필요합니다.");
      return;
    }
    setOnClick(true);
  };
  return (
    <>
      <Button
        className=" flex items-center justify-center font-poorStory"
        size="lg"
        variant="bordered"
        color="default"
        endContent={ContentIcon[content]}
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
