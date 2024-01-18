import React from "react";

export default function CloseIcon({
  className = "stroke-black",
  onClick,
  size = "16",
}: {
  className?: string;
  onClick?: () => void;
  size: string;
}) {
  return (
    <svg
      onClick={onClick}
      className={`stroke-white ${className} flex cursor-pointer items-center justify-center`}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M 3 16.5 L 17 2.5" strokeWidth={3} strokeLinecap="round" />
      <path d="M 3 2.5 L 17 16.346" strokeWidth={3} strokeLinecap="round" />
    </svg>
  );
}
