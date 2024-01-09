"use client";

import React, { useMemo, useState } from "react";

import { motion } from "framer-motion";

import PhotoModal from "@/components/board/modal/photoModal/PhotoModal";
import { Post, PostGridType } from "@/types/post";

import BoardPhotoContent from "./BoardPhotoContent";

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
    [post, type],
  );

  return (
    <>
      <PhotoModal
        post={post}
        onClick={onPhotoClicked}
        handleModalClose={handleModalClose}
      />
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
