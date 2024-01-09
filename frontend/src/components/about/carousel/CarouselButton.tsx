import React from "react";

import { motion } from "framer-motion";

import NextIcon from "@/components/common/icon/NextIcon";
import PrevIcon from "@/components/common/icon/PrevIcon";

export default function CarouselButton({
  paginate,
  direction,
  className,
}: {
  paginate: () => void;
  direction: boolean;
  className: string;
}) {
  return (
    <motion.div
      onClick={paginate}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.2 }}
    >
      {direction ? (
        <NextIcon className={className} />
      ) : (
        <PrevIcon className={className} />
      )}
    </motion.div>
  );
}
