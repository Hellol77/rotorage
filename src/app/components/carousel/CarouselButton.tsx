import React from "react";
import { motion } from "framer-motion";

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
      className={`${className} absolute z-50 flex  select-none items-center justify-center rounded-full fill-slate-200 stroke-slate-200 text-lg font-bold`}
      onClick={paginate}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.2 }}
    >
      {direction ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" />
        </svg>
      )}
    </motion.div>
  );
}
