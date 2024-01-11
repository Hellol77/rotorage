import React, { MouseEvent } from "react";

import { motion } from "framer-motion";

import { MenuItem } from "@/components/common/nav/menu/MenuItem";
import { NAVIGATION_TITLE } from "@/constants/navigation";
import useAuth from "@/hooks/useAuth";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Navigation = ({ toggle }: { toggle: React.MouseEventHandler }) => {
  const { logout, isLogin } = useAuth();
  const onclickLogout = (e: MouseEvent) => {
    toggle(e);
    logout();
  };
  const isLoginNaviation = () => {
    return isLogin ? (
      <>
        <MenuItem title="Logout" key="Logout" toggle={onclickLogout} />
        <MenuItem title="Profile" key="Profile" toggle={toggle} />
      </>
    ) : (
      <>
        <MenuItem title="Login" key="Login" toggle={toggle} />
      </>
    );
  };

  return (
    <motion.ul
      variants={variants}
      className={`absolute right-10 top-10 w-20 p-2`}
    >
      {isLoginNaviation()}
      {NAVIGATION_TITLE.map(({ title }) => (
        <MenuItem title={title} key={title} toggle={toggle} />
        // 로그인 했으면 로그아웃으로 바꾸기
      ))}
    </motion.ul>
  );
};
