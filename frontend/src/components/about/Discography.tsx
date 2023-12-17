import React from "react";
import { DISCOGRAPHY_LIST } from "@/constants/about";
import MusicItem from "./item/MusicItem";

export default function Discography() {
  return (
    <ul className=" relative z-20 mb-12 mt-6 px-4 text-white md:mx-20 md:mb-8  md:mt-4 md:flex md:w-fit md:flex-col md:items-start">
      <li className=" mb-4  text-3xl font-bold tracking-wider md:text-4xl">
        Discography
      </li>
      <div className=" grid w-full  gap-4  sm:grid-cols-1 md:w-fit md:grid-cols-2 md:justify-between ">
        {DISCOGRAPHY_LIST.map((music) => (
          <MusicItem
            key={music.title}
            title={music.title}
            subtitle={music.subtitle}
            album={music.album}
            url={music.url}
          />
        ))}
      </div>
    </ul>
  );
}
