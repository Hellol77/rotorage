import React from "react";
import Introduce from "@/components/about/Introduce";
import Music from "@/components/about/music/Music";
import Discography from "@/components/about/Discography";
import Interview from "@/components/about/Interview";
import Line from "@/components/common/ui/Line";
import { Carousel } from "@/components/about/carousel/Carousel";
import { images } from "@/components/about/carousel/profileImage";

export default function AboutPage() {
  return (
    <main className=" flex h-full w-screen  overflow-x-hidden scrollbar-hide md:pt-48">
      <section className="relative z-20 h-full w-screen">
        <Carousel images={images} />
        <Line text={`Even if you leave `} color="red" deg="4deg" vector={-1} />
        <Introduce />
        <Line
          text="Let Me Love My Youth "
          color="yellow"
          deg="-4deg"
          vector={1}
        />
        <Music />
        <Line
          text="The last stop of our pain "
          color="green"
          deg="3deg"
          vector={-1}
        />
        <Discography />
        <Line text="Landing in Love " color="blue" deg="-4.717deg" vector={1} />
        <Interview />
      </section>
    </main>
  );
}
