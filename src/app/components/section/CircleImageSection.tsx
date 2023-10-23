import React from "react";
import hanroroMainImage from "/public/photo/circle/hanroromain.png";
import hanroro2 from "/public//photo/circle/hanroro2.png";
import CircleImage from "../../ui/CircleImage";
import Lines from "../../ui/Lines";

export default function CircleImageSection() {
  const circlePhotoList = [hanroroMainImage, hanroro2];

  return (
    <section className="z-1 relative flex h-screen w-full snap-start items-center justify-center">
      <CircleImage image={circlePhotoList} />
      <Lines />
    </section>
  );
}
