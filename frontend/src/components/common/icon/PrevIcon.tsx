import React from "react";

export default function PrevIcon({
  className,
  size = "24",
}: {
  className?: string;
  size?: string;
}) {
  return (
    <svg
      className={` fill-slate-200 stroke-slate-200 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
    >
      <path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" />
    </svg>
  );
}
