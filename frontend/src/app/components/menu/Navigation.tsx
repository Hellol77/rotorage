import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};
const itemIds = ["About", "Video", "Gallery", "Board"];

export const Navigation = ({ toggle }: { toggle: React.MouseEventHandler }) => (
  <motion.ul
    variants={variants}
    className={`absolute right-10 top-10 w-20 p-2`}
  >
    {itemIds.map((i) => (
      <MenuItem text={i} key={i} toggle={toggle} />
    ))}
  </motion.ul>
);
