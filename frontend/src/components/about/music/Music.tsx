import React from "react";

import MusicItem from "@/components/about/item/MusicItem";
import MoreText from "@/components/common/ui/MoreText";
import { MUSIC_LIST } from "@/constants/about";

export default function Music() {
  return (
    <ul className="relative z-20 mb-12 mt-12 px-4 text-white md:mb-8 md:mt-4  md:flex md:w-full md:flex-col md:items-end md:px-20">
      <li className=" mb-4  text-3xl font-bold tracking-wider md:text-4xl">
        Music
      </li>
      <div className="grid  w-full  gap-4 sm:grid-cols-1 md:w-fit md:grid-cols-2   ">
        {MUSIC_LIST.map((music) => (
          <MusicItem
            key={music.title}
            title={music.title}
            subtitle={music.subtitle}
            album={music.album}
            url={music.url}
          />
        ))}
      </div>
      <MoreText
        text="MELON"
        url="https://www.melon.com/search/song/index.htm?q=%ED%95%9C%EB%A1%9C%EB%A1%9C&section=artist&searchGnbYn=Y&kkoSpl=Y&kkoDpType="
        color="melon"
      />
    </ul>
  );
}
