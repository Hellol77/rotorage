"use client";
import React from "react";

import PhotoModalContent from "@/components/board/modal/photoModal/PhotoModalContent";
import ModalContainer from "@/components/common/modal/ModalContainer";
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
