import React, { MouseEvent, useState } from "react";

import HeartEmptyIcon from "@/components/common/icon/HeartEmptyIcon";
import HeartFillIcon from "@/components/common/icon/HeartFillIcon";
import { motion } from "framer-motion";

export default function LikeButton({
  isLiked,
  onClick,
  className,
  size = "16",
}: {
  isLiked: boolean;
  onClick: () => void;
  className?: string;
  size?: string;
}) {
  const handleOnClick = (e: MouseEvent) => {
    onClick();
    e.stopPropagation();
  };
  return (
    <motion.div
      className={`${className} cursor-pointer`}
      whileTap={{ scale: 3 }}
      whileHover={{ scale: 1.2 }}
      transition={{ duration: 0.5, type: "spring" }}
      onClick={handleOnClick}
    >
      {!isLiked ? <HeartEmptyIcon size={size} /> : <HeartFillIcon size={size} />}
    </motion.div>
  );
}
