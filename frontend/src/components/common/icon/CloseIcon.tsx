import React from "react";

export default function CloseIcon({
  className = "stroke-black",
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <svg
      onClick={onClick}
      className={`${className}`}
      width={23}
      height={23}
      viewBox="0 0 23 23"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <path
        d="M1 1L13 13M13 1L7 7L1 13"
        stroke-linecap="round"
        stroke-linejoin="round"
      /> */}
      <path d="M 3 16.5 L 17 2.5" strokeWidth={3} strokeLinecap="round" />
      <path d="M 3 2.5 L 17 16.346" strokeWidth={3} strokeLinecap="round" />
    </svg>
  );
}
