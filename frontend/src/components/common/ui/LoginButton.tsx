"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export default function LoginButton({
  image,
  title,
  href,
}: {
  image: StaticImageData;
  title: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <Image
        src={image}
        width={300}
        height={50}
        alt={title}
        className="w-full "
      />
    </Link>
  );
}
