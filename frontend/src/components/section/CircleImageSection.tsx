"use client";
import React from "react";

import CircleImage from "@/components/common/ui/CircleImage";
import Lines from "@/components/common/ui/Lines";

import hanroro2 from "../../../public/photo/circle/hanroro2.png";
import hanroroMainImage from "../../../public/photo/circle/hanroromain.png";

export default function CircleImageSection() {
  const circlePhotoList = [hanroroMainImage, hanroro2];

  return (
    <section className=" relative   mb-20 mt-24 flex w-screen  snap-start  items-center justify-center">
      <CircleImage image={circlePhotoList} />
      <Lines />
    </section>
  );
}
