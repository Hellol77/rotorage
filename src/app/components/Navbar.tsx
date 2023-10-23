import Image from "next/image";
import Link from "next/link";
import React from "react";
import hanroroLogo from "/public/HanroroLogoSVG.svg";
import { Menu } from "./menu/Menu";
const nav = [
  { href: "/about", title: "About" },
  { href: "/video", title: "Video" },
  { href: "/gallery", title: "Gallery" },
  { href: "/board", title: "Board" },
];

export default function Navbar() {
  return (
    <div className=" mr-2 flex w-screen items-center px-6 md:w-full md:px-20 md:pt-4">
      <Link href={"/"}>
        <Image src={hanroroLogo} alt={"Logo"} className="w-28" priority />
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
