"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";

import InstagramIcon from "@/components/common/icon/InstagramIcon";
import YoutubeIcon from "@/components/common/icon/YoutubeIcon";
import { INTRODUCE } from "@/constants/about";
import Link from "next/link";

export default function Introduce() {
  return (
    <ul className="relative z-20 mb-4 mt-4 w-fit border-slate-400 bg-[#101010] bg-opacity-40 px-4 text-white md:ml-20 md:border-l-4 md:pl-7">
      <li className=" text-3xl font-bold tracking-wider text-white">
        <TypeAnimation sequence={["Singer", 1000, "Song-writer", 1000]} repeat={Infinity} />
      </li>
      <h1 className="  text-6xl font-extrabold tracking-wider text-white md:text-7xl">HANRORO</h1>
      <li className="mb-6 text-xl text-slate-300">2000.11.11</li>
      <li className=" mb-4 font-poorStory text-slate-300 md:w-[27rem] ">{INTRODUCE.text}</li>
      <li className="flex">
        <Link href={"https://www.youtube.com/@hanroro6055"} target="_blank">
          <YoutubeIcon size={"44"} />
        </Link>
        <Link href={"https://www.instagram.com/hanr0r0/"} target="_blank">
          <InstagramIcon size={"44"} />
        </Link>
      </li>
    </ul>
  );
}
