"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";

export default function LoginButton({
  image,
  title,
  onClick,
}: {
  image: StaticImageData;
  title: string;
  onClick: () => void;
}) {
  return (
    <Image
      src={image}
      width={300}
      height={50}
      alt={title}
      className="w-full "
      onClick={() => {
        if (onClick) onClick();
      }}
    />
  );
}
