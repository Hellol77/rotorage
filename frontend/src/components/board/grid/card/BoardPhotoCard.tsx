"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import PhotoModal from "../../modal/photoModal/PhotoModal";
import { Post, PostGridType } from "@/types/post";
import BoardPhotoContent from "./BoardPhotoContent";
import PhotoModalContent from "../../modal/photoModal/PhotoModalContent";

export default function BoardPhotoCard({
  post,
  type,
}: {
  post: Post;
  type: PostGridType;
}) {
  const { _id } = post;
  const [onPhotoClicked, setOnPhotoClicked] = useState(false);

  const handleModalOpen = () => {
    setOnPhotoClicked(true);
  };

  const handleModalClose = () => {
    setOnPhotoClicked(false);
  };

  const useMemoBoardPhotoContent = useMemo(
    () => <BoardPhotoContent post={post} type={type} />,
    [post],
  );

  return (
    <>
      <PhotoModal
        handleModalClose={handleModalClose}
        onPhotoClicked={onPhotoClicked}
      >
        <PhotoModalContent post={post} handleModalClose={handleModalClose} />
      </PhotoModal>
      <motion.div
        onClick={handleModalOpen}
        key={_id}
        layoutId={_id}
        transition={{ duration: 0.2 }}
        className="relative z-30 h-44 w-full cursor-pointer md:h-[44vh]"
      >
        {useMemoBoardPhotoContent}
      </motion.div>
    </>
  );
}
