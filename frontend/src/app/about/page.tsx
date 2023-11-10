"use client";
import React from "react";

import { images } from "../../components/carousel/profileImage";
import { Carousel } from "../../components/carousel/Carousel";
import Line from "../ui/Line";
import Link from "next/link";
import YoutubeIcon from "../icon/YoutubeIcon";
import InstagramIcon from "../icon/InstagramIcon";
import album1 from "/public/photo/album/1.jpg";
import album2 from "/public/photo/album/2.jpg";
import album3 from "/public/photo/album/3.jpg";
import album4 from "/public/photo/album/4.jpg";
import album5 from "/public/photo/album/5.jpg";
import album6 from "/public/photo/album/6.jpg";
import album7 from "/public/photo/album/7.webp";
import album8 from "/public/photo/album/8.webp";
import album9 from "/public/photo/album/9.jpg";
import album10 from "/public/photo/album/10.jpg";
import album11 from "/public/photo/album/11.jpg";
import album12 from "/public/photo/album/12.webp";
import album13 from "/public/photo/album/13.webp";

interface MusicType {
  title: string;
  subtitle: string;
  album: StaticImageData;
  url: string;
}

type MusicListType = MusicType[];

const musicList: MusicListType = [
  {
    title: "입춘",
    subtitle: "디지털 싱글",
    album: album1,
    url: "https://www.youtube.com/watch?v=pNi9PjmbUrI",
  },
  {
    title: "거울",
    subtitle: "디지털 싱글",
    album: album2,
    url: "https://www.youtube.com/watch?v=OV668xgCau8",
  },
  {
    title: "비틀비틀 짝짜꿍",
    subtitle: "디지털 싱글",
    album: album3,
    url: "https://www.youtube.com/watch?v=XBiMV9kVhwQ",
  },
  {
    title: "정류장",
    subtitle: "디지털 싱글",
    album: album4,
    url: "https://www.youtube.com/watch?v=2EMgY5E5Ook",
  },
  {
    title: "자처",
    subtitle: "디지털 싱글",
    album: album5,
    url: "https://www.youtube.com/watch?v=JyoltvsJ9Fw",
  },
  {
    title: "이상비행",
    subtitle: "EP",
    album: album6,
    url: "https://www.youtube.com/watch?v=yXDraJ33aLM&t=601s",
  },
];
const discographyList: MusicListType = [
  {
    title: "그런 날",
    subtitle: "작사 첨여",
    album: album7,
    url: "https://www.youtube.com/watch?v=8SSTQDQu6mI",
  },
  {
    title: "다이아몬드",
    subtitle: "작사 참여",
    album: album8,
    url: "https://www.youtube.com/watch?v=Qvavpj87i-A",
  },
  {
    title: "Do What You Like",
    subtitle: "OST",
    album: album9,
    url: "https://www.youtube.com/watch?v=6ec5v1ndt18",
  },
  {
    title: "Like my groove",
    subtitle: "콜라보 싱글",
    album: album10,
    url: "https://www.youtube.com/watch?v=HvocbPnnbhk",
  },
  {
    title: "당신의 밤은 나의 밤과 \n같습니까 (feat.숨비)",
    subtitle: "프로젝트 싱글",
    album: album11,
    url: "https://www.youtube.com/watch?v=tFEe3pwlQgE",
  },
  {
    title: "Romantico (feat. 한로로)",
    subtitle: "피쳐링",
    album: album12,
    url: "https://www.youtube.com/watch?v=kKf4_VMlKec",
  },
  {
    title: "물수제비",
    subtitle: "프로듀싱 참여",
    album: album13,
    url: "https://www.youtube.com/watch?v=At4xTbav5ic",
  },
];

import AlbumItem from "../../components/item/AlbumItem";
import MoreText from "../ui/MoreText";
import { StaticImageData } from "next/image";
import { TypeAnimation } from "react-type-animation";
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
            {musicList.map((music) => (
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
            {discographyList.map((music) => (
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
          <li className=" w-full md:w-96 md:text-xl">
            <div className=" mb-4 text-3xl font-bold tracking-wider md:text-4xl">
              Latest interview
            </div>
            <p className="font-poorStory text-slate-300">
              “저는 일단 노래를 시작하게 된 이유가 제 이야기를 어딘가에
              풀어내보고 싶단 생각에서였어요. 말로 하기엔 뭔가 민망하고, 얼굴을
              모르는 사람들에게도 내 메세지를 전하면서 소통할 수 있으면 좋겠다는
              생각을 하며 노래를 시작하게 된 것 같아요.”...
            </p>
          </li>
          <MoreText text="MORE" url="https://www.indiepost.co.kr/post/16936" />
        </ul>
      </section>
    </main>
  );
}
