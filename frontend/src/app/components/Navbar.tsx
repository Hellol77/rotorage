import Image from "next/image";
import Link from "next/link";
import React from "react";
import hanroroLogo from "/public/HanroroLogoSVG.svg";
import { Menu } from "./menu/Menu";
import MainLogoIcon from "../icon/MainLogoIcon";
const nav = [
  { href: "/about", title: "About" },
  { href: "/video", title: "Video" },
  { href: "/gallery", title: "Gallery" },
  { href: "/board", title: "Board" },
];

export default function Navbar() {
  return (
    <div className=" mr-2 flex w-screen items-center px-6 md:w-full md:px-20 md:pt-4">
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
