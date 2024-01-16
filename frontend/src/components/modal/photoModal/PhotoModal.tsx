import React from "react";

import PhotoModalContent from "@/components/modal/photoModal/PhotoModalContent";
import ModalContainer from "@/components/common/modal/ModalContainer";
import { Post } from "@/types/post";

export default function PhotoModal({
  handleModalClose,
  onClick,
  post,
  queryKey,
  ...props
}: {
  post: Post;
  onClick: boolean;
  handleModalClose: () => void;
  queryKey: string[];
}) {
  return (
    <ModalContainer handleModalClose={handleModalClose} onClick={onClick}>
      <PhotoModalContent post={post} handleModalClose={handleModalClose} queryKey={queryKey} />
    </ModalContainer>
  );
}