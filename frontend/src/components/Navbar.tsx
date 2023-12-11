"use client";
import Link from "next/link";
import React from "react";
import { Menu } from "./menu/Menu";
import { usePathname } from "next/navigation";
import { NAVIGATION_TITLE } from "@/constants/navigation";
import MainLogoIcon from "./common/icon/MainLogoIcon";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div
      className={`mr-2 flex w-screen items-center ${
        pathname === "/video" || "/" ? "bg-transparent" : "bg-[#101010]"
      } px-6 md:w-screen md:px-20 md:pt-4`}
    >
      <Link href={"/"} className="mr-4">
        <MainLogoIcon className="h-20 w-20" textColor="black" bgColor="white" />
      </Link>

      <ul className=" hidden h-20 w-full items-center justify-end gap-8 font-extrabold md:flex">
        {NAVIGATION_TITLE.map(({ title }) => (
          <li key={title}>
            <Link href={`/${title.toLowerCase()}`} className=" text-lg">
              {title}
            </Link>
          </li>
        ))}
      </ul>
      <Menu />
    </div>
  );
}
