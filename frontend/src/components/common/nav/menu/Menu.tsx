"use client";
import * as React from "react";

import { MenuToggle } from "@/components/common/nav/menu/MenuToggle";
import { Navigation } from "@/components/common/nav/menu/Navigation";
import { motion, useCycle } from "framer-motion";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 132px 42px)`,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0.1px at 132px 42px)",
    transition: {
      delay: 0.1,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export const Menu = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <>
      <motion.div
        className={`absolute bottom-0 left-0 top-0 hidden h-screen w-screen bg-black opacity-50  md:hidden`}
        animate={
          isOpen
            ? {
                display: "flex",
              }
            : {
                display: "none",
              }
        }
        onClick={() => toggleOpen()}
      />
      <motion.nav
        className={`absolute right-0 top-0 z-50 flex h-screen items-center justify-end md:hidden  `}
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
        <motion.div
          className="z-900  absolute bottom-0 right-0 top-0 h-full w-40  bg-slate-200"
          variants={sidebar}
        />
        <Navigation toggle={() => toggleOpen()} />
        <MenuToggle toggle={() => toggleOpen()} />
      </motion.nav>
    </>
  );
};
