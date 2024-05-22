"use client";
import React from "react";

import CircleImage from "@/components/common/ui/CircleImage";
import Lines from "@/components/common/ui/Lines";

import hanroroMainImage2 from "../../../../public/photo/circle/hanroromain2.webp";

export default function CircleImageSection() {
  const circlePhotoList = [hanroroMainImage2];

  return (
    <section className=" relative   mb-20 mt-24 flex w-screen  snap-start  items-center justify-center">
      <CircleImage image={circlePhotoList} />
      <Lines />
    </section>
  );
}
