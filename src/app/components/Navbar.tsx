import Image from "next/image";
import Link from "next/link";
import React from "react";
import hanroroLogo from "/public/HanroroLogoSVG.svg";
import menuImage from "/public/menu.svg";
const nav = [
  { href: "/about", title: "About" },
  { href: "/music", title: "Music" },
  { href: "/photo", title: "Photo" },
  { href: "/board", title: "Board" },
];

export default function Navbar() {
  return (
    <div className="z-999 mr-2 flex w-screen items-center px-6 md:w-full md:px-20 md:pt-4">
      <Link href={"/"}>
        <Image src={hanroroLogo} alt={"Logo"} className="w-28" priority />
      </Link>

      <ul className="z-999  flex h-20 w-full items-center justify-end gap-8 font-extrabold">
        {nav.map(({ href, title }) => (
          <li key={title} className="hidden md:flex ">
            <Link href={href} className=" text-lg">
              {title}
            </Link>
          </li>
        ))}
        <Image
          src={menuImage}
          sizes="100px"
          alt="menu"
          className="w-8 md:hidden "
        />
      </ul>
    </div>
  );
}
