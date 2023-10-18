"use client";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0, transition: { delay: 0.3 } },
  exit: { opacity: 0, x: 200, y: 0, transition: { delay: 1 } },
};

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <motion.div
        className="h-full"
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: "linear" }}
      >
        {children}
      </motion.div>
  );
}
