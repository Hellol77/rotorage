"use client";

import React, { useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import YouTube, { YouTubeProps } from "react-youtube";

import YoutubeIcon from "@/components/common/icon/YoutubeIcon";
import { motion, useInView, Variants } from "framer-motion";
import Link from "next/link";

type SongType = "입춘" | "정류장" | "화해" | "사랑하게 될 거야";
type PropsType = { title: SongType };
type ContentType = {
  title: SongType;
  text: string;
  // video: string;
  youtubeLink: string;
  youtubeId: string;
};

type GetPropsContent = {
  [key in SongType]: ContentType;
};
const cardVariants: Variants = {
  onscreen: {
    opacity: 1,
  },
  offscreen: {
    opacity: 0,
    transition: {
      duration: 1.2,
    },
  },
};
const getPropsContent: GetPropsContent = {
  입춘: {
    title: "입춘",
    text: `얼어붙은 마음에
    누가 입 맞춰줄까요
    봄을 기다린다는 말
    그 말의 근거가 될 수 있나요

    바삐 오가던 바람
    여유 생겨 말하네요
    내가 기다린다는 봄
    왔으니 이번엔 놓지 말라고

    아슬히 고개 내민 내게
    첫 봄인사를 건네줘요 피울 수 있게
    도와줘요
    이 마음 저무는 날까지
    푸른 낭만을 선물할게 초라한 나를
    꺾어가요

    이 벅찬 봄날이 시들 때
    한 번만 나를 돌아봐요`,
    // video: require("/public/video/video1.mp4"),
    youtubeLink: "https://www.youtube.com/watch?v=kIiW3XRP7bU",
    youtubeId: "kIiW3XRP7bU",
  },
  정류장: {
    title: "정류장",
    text: `난 모든 걸 멈춰 세울래
    나의 절망과 소망까지도
    또 다른 내가 찾아올 때
    편히 쉬었다 갈 수 있도록

    세모난 바퀴도
    나사 빠진 핸들도
    깜빡이는 신호등도
    결국 모두 살아있네

    차가웠던 여름도
    울어버린 가을도
    남기지 못해 멍든 겨울을 난
    안을래요

    맞이하는 사랑 없어도
    텅 빈 이곳은 따뜻하네요
    아무도 서지 않는
    그 누구도 모르는
    짙은 향기를 담은
    코끝이 시려 올 때
    그럴 때 마침 일어설래요
    `,
    // video: require("/public/video/video2.mp4"),
    youtubeLink: "https://www.youtube.com/watch?v=2EMgY5E5Ook",
    youtubeId: "2EMgY5E5Ook",
  },
  화해: {
    title: "화해",
    text: `난 나의 어둠을 변명하려
    저 푸른 하늘을 끌어왔어요 창피하게
    부러움 속에서 피어나는
    동경을 안고서 날아갈래요 아주 높이

    아 동정은 마요
    잠시 내게서 벗어날 뿐야
    차가운 바람에 부서진대도
    무너지진 않을 테니

    가끔 떠오르던 얼굴들이
    흐려져 가는 건 당연할까요 그렇겠죠
    또 낯선 것들로 쉴 틈 없이
    채워진 도시를 벗어날래요 아주 멀리

    오늘까지만 나를 머금은 구름 되어
    빗물에 털어낼래요

    아 난 행복해요
    붉은 눈가 언저리 새살이 돋았으니
    차가운 세상도 녹여내고 싶단
    꿈을 가득 품어냈으니`,
    // video: require("/public/video/video3.mp4"),
    youtubeLink: "https://www.youtube.com/watch?v=gC2zA8NRzXk",
    youtubeId: "gC2zA8NRzXk",
  },
  "사랑하게 될 거야": {
    title: "사랑하게 될 거야",
    text: `영원을 꿈꾸던 널 떠나보내고
    슬퍼하던 날까지도 떠나보냈네
    오늘의 나에게 남아있는 건
    피하지 못해 자라난 무던함뿐야

    그곳의 나는 얼마만큼 울었는지
    이곳의 나는 누구보다 잘 알기에
    후회로 가득 채운 유리잔만
    내려다보네

    아 뭐가 그리 샘이 났길래
    그토록 휘몰아쳤던가
    그럼에도 불구하고
    나는 너를 용서하고
    사랑하게 될 거야

    아파했지만 또 아파도 되는 기억
    불안한 내게 모난 돌을 쥐여주던
    깨진 조각 틈 새어 나온 눈물
    터뜨려 보네`,
    // video: require("/public/video/video4.mp4"),
    youtubeLink: "https://www.youtube.com/watch?v=h0KIWaUEIgQ",
    youtubeId: "h0KIWaUEIgQ",
  },
};

const opts: YouTubeProps["opts"] = {
  playerVars: { autoplay: 1 },
};
export default function VideoSection({ title }: PropsType) {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const videoRef = useRef<YouTube>(null);
  return (
    <section className="relative inset-0 z-10 flex min-h-[100lvh] w-screen snap-start  overflow-hidden ">
      {/* <video
        className="absolute z-30 h-full w-screen overflow-y-hidden object-cover opacity-30 md:object-cover md:opacity-90"
        src={getPropsContent[title].video}
        autoPlay
        muted
        playsInline
        loop
      ></video> */}
      <YouTube
        iframeClassName="absolute z-30 h-screen w-screen overflow-y-hidden object-fit opacity-30 md:object-cover md:opacity-90"
        videoId={getPropsContent[title].youtubeId}
        opts={opts}
        ref={videoRef}
        onReady={(e) => {
          e.target.mute(); //소리 끔
        }}
      />
      <div className="absolute top-0 z-30 flex h-full w-screen bg-transparent bg-gradient-to-l from-transparent from-40%  via-[#101010] to-[#101010] md:from-0% md:via-70%" />
      <motion.div
        initial="onscreen"
        whileInView="offscreen"
        viewport={{ once: false, amount: 0.8 }}
        variants={cardVariants}
        className="absolute top-0 z-40 h-full w-screen bg-[#101010]"
      />
      <div className="absolute left-6 top-20 z-40  h-full flex-col justify-start md:left-20 md:top-36">
        <div
          ref={ref}
          className=" z-40 mb-4 flex	 font-poorStory text-2xl  font-bold  text-slate-300 md:mb-5 md:text-4xl"
        >
          {getPropsContent[title].title}
          <Link
            href={getPropsContent[title].youtubeLink}
            className="flex items-center justify-center gap-8"
            target="_blank"
          >
            <YoutubeIcon size="24" className="ml-4" />
          </Link>
        </div>
        {isInView ? (
          <TypeAnimation
            style={{ whiteSpace: "pre-line" }}
            className="z-40  w-40 font-poorStory text-sm  text-slate-300 md:text-base lg:text-lg"
            sequence={[getPropsContent[title].text]}
            speed={70}
          />
        ) : (
          ""
        )}
      </div>
    </section>
  );
}
