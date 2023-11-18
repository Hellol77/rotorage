import React from "react";
import { Carousel } from "../carousel/Carousel";
import { images } from "../carousel/profileImage";

export default function ProfileSection() {
  return (
    <section className="relative inset-0 flex h-screen w-screen flex-col  overflow-hidden md:flex-row">
      <Carousel images={images} />
    </section>
  );
}
