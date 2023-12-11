import React from "react";
import hanroroMainImage from "/public/photo/circle/hanroromain.png";
import hanroro2 from "/public//photo/circle/hanroro2.png";
import CircleImage from "../common/ui/CircleImage";
import Lines from "../common/ui/Lines";

export default function CircleImageSection() {
  const circlePhotoList = [hanroroMainImage, hanroro2];

  return (
    <section className="relative flex h-screen w-full snap-start items-center justify-center">
      <CircleImage image={circlePhotoList} />
      <Lines />
    </section>
  );
}
