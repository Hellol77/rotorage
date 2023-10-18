"use client";
import React from "react";

import { images } from "../components/carousel/profileImage";
import { Carousel } from "../components/carousel/Carousel";

export default function AboutPage() {
  return (
    <main className=" flex h-screen w-screen overflow-hidden scrollbar-hide">
      <section className="relative inset-0 flex h-screen w-screen flex-col  overflow-hidden md:flex-row">
        <div className=" w-1/2 bg-[#999999]"></div>
        <Carousel images={images} />
      </section>
    </main>
  );
}
