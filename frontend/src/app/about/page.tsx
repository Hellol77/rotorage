import { images } from "@/components/about/carousel/profileImage";
import dynamic from "next/dynamic";
const Carousel = dynamic(() => import("@/components/about/carousel/Carousel"));
const Discography = dynamic(() => import("@/components/about/Discography"));
const Interview = dynamic(() => import("@/components/about/Interview"));
const Introduce = dynamic(() => import("@/components/about/Introduce"));
const Music = dynamic(() => import("@/components/about/music/Music"));
const Line = dynamic(() => import("@/components/common/ui/Line"));

export default function AboutPage() {
  return (
    <main className=" flex h-full w-screen  overflow-x-hidden scrollbar-hide md:pt-48">
      <section className="relative z-20 h-full min-h-screen w-screen">
        <Carousel images={images} />
        <Line text={`Even if you leave `} color="red" deg="4deg" vector={-1} />
        <Introduce />
        <Line text="Let Me Love My Youth " color="yellow" deg="-4deg" vector={1} />
        <Music />
        <Line text="The last stop of our pain " color="green" deg="3deg" vector={-1} />
        <Discography />
        <Line text="Landing in Love " color="blue" deg="-4.717deg" vector={1} />
        <Interview />
      </section>
    </main>
  );
}
