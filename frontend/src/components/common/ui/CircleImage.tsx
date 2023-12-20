import React from "react";
import Image, { StaticImageData } from "next/image";
import MainLogoIcon from "../icon/MainLogoIcon";

// 배열을 넣어서 누를때마다 사진 바뀌게
type Props = {
  image: StaticImageData[];
};

export default function CircleImage({ image }: Props) {
  return (
    <>
      <div className="absolute  z-30 flex h-64 w-64 items-center justify-center rounded-full bg-[#323030] md:mt-10 md:h-[28vw] md:max-h-[40rem] md:w-[28vw] md:max-w-[40rem]">
        <Image
          src={image[0]}
          priority
          className="absolute w-60	rounded-full md:h-[26vw] md:max-h-[36rem] md:w-[26vw] md:max-w-[36rem]"
          alt="circlePhoto"
        />
        <MainLogoIcon
          textColor="black"
          bgColor="white"
          className="w-18 relative left-20 top-24 z-40 md:left-[35%] md:top-[35%] md:w-[14vw]"
        />
      </div>
    </>
  );
}
