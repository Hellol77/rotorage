import React from "react";
import Image, { StaticImageData } from "next/image";
import circleImage from "/public/photo/Circle Photo.png";
import hanroroMain from "/public/photo/hanroromain.png";

// 배열을 넣어서 누를때마다 사진 바뀌게
type Props = {
  image: StaticImageData;
};

export default function CircleImage({ image }: Props) {
  return (
    <>
      <div className=" relative mt-32 flex h-60 w-60 items-center justify-center rounded-full bg-[#323030] md:mt-10 md:h-[34rem] md:w-[34rem]">
        <Image
          src={image}
          className="w-56 rounded-full	md:w-[32rem]"
          alt="circlePhoto"
        />
      </div>
    </>
  );
}
