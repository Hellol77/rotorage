import * as React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const variants = {
  open: {
    display: "block",

    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    transitionEnd: { display: "none" },
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const MenuItem = ({
  title,
  toggle,
}: {
  title: string;
  toggle: React.MouseEventHandler;
}) => {
  const router = useRouter();
  const handleOnclick = (e: React.MouseEvent) => {
    toggle(e);
    if (title === "Logout") {
      router.push("/");
      return;
    }
    router.push(`/${title.toLowerCase()}`);
  };
  return (
    <motion.li
      className="m-2 flex list-none"
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleOnclick}
    >
      <p className=" z-300 w-26 border-2 border-solid font-poorStory text-2xl font-extrabold  text-[#101010]">
        {title}
      </p>
    </motion.li>
  );
};
