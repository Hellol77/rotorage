"use client";

import React, { useMemo, useState } from "react";

import PhotoModal from "@/components/modalTemplate/photoModal/PhotoModal";
import { Post, PostGridType } from "@/types/post";
import { AnimatePresence, motion } from "framer-motion";

import BoardPhotoContent from "./BoardPhotoContent";

export default function BoardPhotoCard({
  post,
  type,
  queryKey,
}: {
  post: Post;
  type: PostGridType;
  queryKey: string[];
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
    () => <BoardPhotoContent post={post} type={type} queryKey={queryKey} />,
    [post, type, queryKey],
  );

  return (
    <>
      <AnimatePresence>
        <PhotoModal
          post={post}
          onClick={onPhotoClicked}
          handleModalClose={handleModalClose}
          queryKey={queryKey}
        />
      </AnimatePresence>
      <motion.div
        onClick={handleModalOpen}
        key={_id}
        layoutId={_id + queryKey}
        transition={{ duration: 0.2 }}
        className="relative z-30 h-60 w-full cursor-pointer md:h-96 "
      >
        {useMemoBoardPhotoContent}
      </motion.div>
    </>
  );
}
