import React from "react";

export default function NextIcon({
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
      <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
    </svg>
  );
}
