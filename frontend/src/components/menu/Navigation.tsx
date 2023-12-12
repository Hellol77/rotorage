import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { NAVIGATION_TITLE } from "@/constants/navigation";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Navigation = ({ toggle }: { toggle: React.MouseEventHandler }) => (
  <motion.ul
    variants={variants}
    className={`absolute right-10 top-10 w-20 p-2`}
  >
    {NAVIGATION_TITLE.map(({ title }) => (
      <MenuItem title={title} key={title} toggle={toggle} />
      // 로그인 했으면 로그아웃으로 바꾸기
    ))}
  </motion.ul>
);
