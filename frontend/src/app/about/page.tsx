"use client";
import React from "react";

import { images } from "../../components/carousel/profileImage";
import { Carousel } from "../../components/carousel/Carousel";
import Line from "../../components/common/ui/Line";
import Link from "next/link";
import AlbumItem from "../../components/item/AlbumItem";
import MoreText from "../../components/common/ui/MoreText";
import { TypeAnimation } from "react-type-animation";
import YoutubeIcon from "@/components/common/icon/YoutubeIcon";
import InstagramIcon from "@/components/common/icon/InstagramIcon";
import { DISCOGRAPHY_LIST, INTERVIEW, MUSIC_LIST } from "@/constants/about";

export default function AboutPage() {
  return (
    <main className=" flex h-full w-screen overflow-x-hidden scrollbar-hide">
      <section className="relative z-20 h-full w-screen md:pt-48 ">
        <Carousel images={images} />
        <Line text={`Even if you leave `} color="red" deg="4deg" vector={-1} />
        <ul className="relative z-20 mb-4 mt-4 w-fit border-slate-400 bg-[#101010] bg-opacity-40 px-4 text-white md:ml-20 md:border-l-4 md:pl-7">
          <li className=" text-3xl font-bold tracking-wider text-white">
            <TypeAnimation
              sequence={["Singer", 3000, "Song-writer", 3000]}
              repeat={Infinity}
            />
          </li>
          <h1 className="  text-6xl font-extrabold tracking-wider text-white md:text-7xl">
            HANRORO
          </h1>
          <li className="mb-6 text-xl text-slate-300">2000.11.11</li>
          <li className=" mb-4 font-poorStory text-slate-300 md:w-[27rem] ">
            다가올 미래를 두려워하는 청춘에게 손을 건네는 것으로 그의 작품은
            시작됩니다. 누구보다 자신의 두려움이 크지만, 못지않은 용기로
            한로로는 분연히 시대의 아픔을 관통하고 우리와 유대합니다.
          </li>
          <li className="flex">
            <Link href={"https://www.youtube.com/@hanroro6055"} target="_blank">
              <YoutubeIcon size={"44"} />
            </Link>
            <Link href={"https://www.instagram.com/hanr0r0/"} target="_blank">
              <InstagramIcon size={"44"} />
            </Link>
          </li>
        </ul>
        <Line
          text="Let Me Love My Youth "
          color="yellow"
          deg="-4deg"
          vector={1}
        />
        <ul className="relative z-20 mb-12 mt-12 px-4 text-white md:mb-8 md:mt-4  md:flex md:w-full md:flex-col md:items-end md:px-20">
          <li className=" mb-4  text-3xl font-bold tracking-wider md:text-4xl">
            Music
          </li>
          <div className="grid  w-full  gap-4 sm:grid-cols-1 md:w-fit md:grid-cols-2   ">
            {MUSIC_LIST.map((music) => (
              <AlbumItem
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
        <Line
          text="The last stop of our pain "
          color="green"
          deg="3deg"
          vector={-1}
        />
        <ul className=" relative z-20 mb-12 mt-6 px-4 text-white md:mx-20 md:mb-8  md:mt-4 md:flex md:w-fit md:flex-col md:items-start">
          <li className=" mb-4  text-3xl font-bold tracking-wider md:text-4xl">
            Discography
          </li>
          <div className=" grid w-full  gap-4  sm:grid-cols-1 md:w-fit md:grid-cols-2 md:justify-between ">
            {DISCOGRAPHY_LIST.map((music) => (
              <AlbumItem
                key={music.title}
                title={music.title}
                subtitle={music.subtitle}
                album={music.album}
                url={music.url}
              />
            ))}
          </div>
        </ul>
        <Line text="Landing in Love " color="blue" deg="-4.717deg" vector={1} />
        <ul className="relative z-20 mb-12 mt-12 px-4 text-white md:mt-4  md:flex md:w-full md:flex-col md:items-end md:px-20">
          <div className=" w-full md:w-96 md:text-xl">
            <li className=" mb-4 text-3xl font-bold tracking-wider md:text-4xl">
              Interview
            </li>
            {INTERVIEW.map(({ content, url }) => {
              return (
                <>
                  <p className="font-poorStory text-slate-300">{content}</p>
                  <MoreText text="MORE" url={url} />
                </>
              );
            })}
          </div>
        </ul>
      </section>
    </main>
  );
}
