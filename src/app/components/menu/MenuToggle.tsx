import * as React from "react";
import { motion } from "framer-motion";

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    strokeLinecap="round"
    transition={{ duration: 0.2 }}
    {...props}
  />
);
export const MenuToggle = ({ toggle }: { toggle: React.MouseEventHandler }) => {
  return (
    <button
      onClick={toggle}
      className="absolute right-4 top-8 flex items-center justify-center rounded-full bg-transparent"
    >
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          variants={{
            closed: {
              d: "M 2 2.5 L 20 2.5",
              stroke: "#e2e8f0",
            },
            open: { d: "M 3 16.5 L 17 2.5", stroke: "#101010" },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1, stroke: "#e2e8f0" },
            open: { opacity: 0 },
          }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346", stroke: "#e2e8f0" },
            open: { d: "M 3 2.5 L 17 16.346", stroke: "#101010" },
          }}
        />
      </svg>
    </button>
  );
};
