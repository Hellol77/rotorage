import React from "react";
import Image, { StaticImageData } from "next/image";
import hanroroLogo from "/public/HanroroLogoSVG.svg";
// 배열을 넣어서 누를때마다 사진 바뀌게
type Props = {
  image: StaticImageData;
};

export default function CircleImage({ image }: Props) {
  return (
    <>
      <div className="relative z-30 mt-32 flex h-60 w-60 items-center justify-center rounded-full bg-[#323030] md:mt-10 md:h-[34rem] md:w-[34rem]">
        <Image
          src={image}
          priority
          className="absolute w-56	rounded-full md:w-[32rem]"
          alt="circlePhoto"
        />
        <Image
          src={hanroroLogo}
          className="relative left-16 top-24 z-40 w-20 md:left-36 md:top-52 md:w-48"
          alt={"logo"}
        />
      </div>
    </>
  );
}
