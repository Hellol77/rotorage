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
    <Link href={href} className="w-full">
      <Image src={image} width={500} height={50} alt={title} className="w-full" />
    </Link>
  );
}
