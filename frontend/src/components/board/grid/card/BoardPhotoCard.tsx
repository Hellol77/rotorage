"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhotoModal from "../../modal/photoModal/PhotoModal";
import { Post } from "@/types/post";
import useScrollFixed from "@/hooks/useScrollFixed";
import BoardPhotoContent from "./BoardPhotoContent";
import PhotoModalContent from "../../modal/photoModal/PhotoModalContent";

export default function BoardPhotoCard({ post }: { post: Post }) {
  const { imageUrl } = post;
  const [onPhotoClicked, setOnPhotoClicked] = useState(false);
  useScrollFixed(onPhotoClicked);

  const handleModalOpen = () => {
    setOnPhotoClicked(true);
  };

  const handleModalClose = () => {
    setOnPhotoClicked(false);
  };

  const useMemoBoardPhotoContent = useMemo(
    () => <BoardPhotoContent post={post} />,
    [post],
  );

  return (
    <>
      <AnimatePresence>
        {onPhotoClicked && (
          <>
            <PhotoModal handleModalClose={handleModalClose}>
              <PhotoModalContent
                post={post}
                handleModalClose={handleModalClose}
              />
            </PhotoModal>
          </>
        )}
        <motion.div
          onClick={handleModalOpen}
          key={imageUrl}
          layoutId={imageUrl}
          transition={{ duration: 0.2 }}
          className="relative z-30 h-44 w-full cursor-pointer md:h-[44vh]"
        >
          {useMemoBoardPhotoContent}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
