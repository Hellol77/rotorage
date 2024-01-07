"use client";
import React from "react";
import ModalContainer from "@/components/common/modal/ModalContainer";
import PhotoModalContent from "./PhotoModalContent";
import { Post } from "@/types/post";

export default function PhotoModal({
  handleModalClose,
  onClick,
  post,
  ...props
}: {
  post: Post;
  onClick: boolean;
  handleModalClose: () => void;
}) {
  return (
    <ModalContainer handleModalClose={handleModalClose} onClick={onClick}>
      <PhotoModalContent post={post} handleModalClose={handleModalClose} />
    </ModalContainer>
  );
}
