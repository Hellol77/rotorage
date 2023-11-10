"use client";
import Link from "next/link";
import React from "react";
import { Menu } from "./menu/Menu";
import MainLogoIcon from "../app/icon/MainLogoIcon";
import { usePathname } from "next/navigation";
const nav = [
  { href: "/about", title: "About" },
  { href: "/video", title: "Video" },
  { href: "/gallery", title: "Gallery" },
  { href: "/board", title: "Board" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div
      className={`mr-2 flex w-screen items-center ${
        pathname === "/video" ? "bg-transparent" : "bg-[#101010]"
      } px-6 md:w-screen md:px-20 md:pt-4`}
    >
      <Link href={"/"} className="mr-4">
        <MainLogoIcon className="h-20 w-20" textColor="black" bgColor="white" />
      </Link>

      <ul className="flex h-20 w-full items-center justify-end gap-8 font-extrabold">
        {nav.map(({ href, title }) => (
          <li key={title} className="hidden md:flex ">
            <Link href={href} className=" text-lg">
              {title}
            </Link>
          </li>
        ))}
      </ul>
      <Menu />
    </div>
  );
}
