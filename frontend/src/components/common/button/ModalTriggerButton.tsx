"use client";
import React, { ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";

import BoardLoadingIcon from "@/components/common/icon/BoardLoadingIcon";
import PostMoreIcon from "@/components/common/icon/PostMoreIcon";
import UploadIcon from "@/components/common/icon/UploadIcon";
import { UserDataContext } from "@/contexts/AuthContext";
import ModalTriggerButtonProvider from "@/contexts/ModalTriggerButton.context";

const ContentIcon = {
  uploadIcon: <UploadIcon color="white" className="h-4 w-4" />,
  postMoreIcon: <PostMoreIcon />,
  loading: <BoardLoadingIcon className="h-4 w-4" />,
};

export default function ModalTriggerButton({
  text,
  content,
  children,
  isLoading,
  size = "sm",
  color = "primary",
  loginRequired = false,
}: {
  text: string;
  children: ReactNode;
  content?: keyof typeof ContentIcon;
  loginRequired?: boolean;
  isLoading?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "danger" | "success";
}) {
  const userData = useContext(UserDataContext);
  const [onClick, setOnClick] = useState(false);
  const handleOnClick = () => {
    if (loginRequired && !userData?.user.userId) {
      toast.warn("로그인이 필요합니다.");
      return;
    }
    setOnClick(true);
  };
  const handleCloseOnClick = () => {
    setOnClick(false);
  };
  return (
    <>
      <button
        className={`flex min-w-fit items-center justify-center gap-2 rounded-3xl border-2   ${getColor(color)} ${getSize(size)} font-poorStory  ${isLoading ? "bg-gray-500" : ""}`}
        color="primary"
        onClick={handleOnClick}
      >
        {isLoading ? ContentIcon.loading : content ? ContentIcon[content] : null}
        {text}
      </button>
      <ModalTriggerButtonProvider onClick={onClick} handleCloseOnClick={handleCloseOnClick}>
        {children}
      </ModalTriggerButtonProvider>
    </>
  );
}

const getColor = (color: string) => {
  switch (color) {
    case "primary":
      return "bg-blue-500 hover:bg-blue-600";
    case "secondary":
      return "bg-gray-500 hover:bg-gray-600";
    case "danger":
      return "bg-red-500 hover:bg-red-600";
    case "success":
      return "bg-green-500 hover:bg-green-600";
    default:
      return "bg-blue-500 hover:bg-blue-600";
  }
};

const getSize = (size: string) => {
  switch (size) {
    case "sm":
      return "px-3 py-1 text-sm";
    case "md":
      return "px-4 py-2 text-md";
    case "lg":
      return "px-5 py-3 text-lg";
    default:
      return "px-5 py-3 text-lg";
  }
};
