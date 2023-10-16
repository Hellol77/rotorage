"use client";
import * as React from "react";
import { motion, useCycle } from "framer-motion";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 132px 42px)`,
    transition: {
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
        className={`absolute bottom-0 left-0 top-0 flex w-screen bg-black opacity-50 ${
          isOpen ? " h-screen" : "hidden"
        } md:hidden`}
        onClick={() => toggleOpen()}
      />
      <motion.nav
        className={`z-1000 absolute right-0 top-0 flex w-40 items-center justify-end md:hidden  ${
          isOpen ? "h-screen" : ""
        }`}
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
        <motion.div
          className="z-1000  bottom-0 right-0 top-0 h-full w-40  bg-slate-200"
          variants={sidebar}
        />
        <Navigation isOpen={isOpen} />
        <MenuToggle toggle={() => toggleOpen()} />
      </motion.nav>
    </>
  );
};
