"use client";
import React, { MouseEvent, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";

import BoardLoadingIcon from "@/components/common/icon/BoardLoadingIcon";
import DotsHorizontalIcon from "@/components/common/icon/DotsHorizontalIcon";
import PostMoreIcon from "@/components/common/icon/PostMoreIcon";
import UploadIcon from "@/components/common/icon/UploadIcon";
import { UserDataContext } from "@/contexts/AuthContext";
import ModalTriggerButtonProvider from "@/contexts/ModalTriggerButton.context";

const ContentIcon = {
  uploadIcon: <UploadIcon color="white" className="h-4 w-4" />,
  postMoreIcon: <PostMoreIcon />,
  loading: <BoardLoadingIcon className="h-4 w-4" />,
  more: <DotsHorizontalIcon size="32 " />,
};

export default function ModalTriggerButton({
  text,
  content,
  children,
  isLoading,
  size = "sm",
  color,
  loginRequired = false,
  className,
}: {
  children: ReactNode;
  text?: string;
  content?: keyof typeof ContentIcon;
  loginRequired?: boolean;
  isLoading?: boolean;
  size?: "sm" | "md" | "lg" | "icon";
  color?: "primary" | "secondary" | "danger" | "success";
  className?: string;
}) {
  const userData = useContext(UserDataContext);
  const [onClick, setOnClick] = useState(false);
  const handleOnClick = (e: MouseEvent) => {
    e.stopPropagation();
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
      <div
        className={`flex min-w-fit cursor-pointer items-center justify-center gap-2 rounded-3xl    ${getColor(color, isLoading)} ${getSize(size)} font-poorStory  ${isLoading ? "bg-gray-500" : ""} ${className}}`}
        color="primary"
        onClick={handleOnClick}
      >
        {isLoading ? ContentIcon.loading : content ? ContentIcon[content] : null}
        {text}
      </div>
      <ModalTriggerButtonProvider onClick={onClick} handleCloseOnClick={handleCloseOnClick}>
        {children}
      </ModalTriggerButtonProvider>
    </>
  );
}

const getColor = (color: string | undefined, isLoading: boolean | undefined) => {
  switch (color) {
    case "primary":
      return `bg-blue-500  border-2 z-10 ${isLoading ? "" : "hover:bg-blue-600"}`;
    case "secondary":
      return `bg-gray-500  border-2 z-10 ${isLoading ? "" : "hover:bg-gray-600"}`;
    case "danger":
      return `bg-red-500  border-2 z-10 ${isLoading ? "" : "hover:bg-red-600"}`;
    case "success":
      return `bg-green-500  border-2 z-10 ${isLoading ? "" : "hover:bg-green-600"}`;
    default:
      return "";
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
    case "icon":
      return "z-50";
    default:
      return "";
  }
};
