import React from "react";

export default function UploadIcon({
  size = "24",
  color = "black",
  className,
}: {
  size?: string;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11 15H13V9H16L12 4L8 9H11V15Z" fill={color} />
      <path
        d="M20 18H4V11H2V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V11H20V18Z"
        fill={color}
      />
    </svg>
  );
}
