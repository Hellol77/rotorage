import React from "react";

import { Carousel } from "@/components/about/carousel/Carousel";
import { images } from "@/components/about/carousel/profileImage";

export default function ProfileSection() {
  return (
    <section className="relative inset-0 flex h-screen w-screen flex-col  overflow-hidden md:flex-row">
      <Carousel images={images} />
    </section>
  );
}
