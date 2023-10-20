"use client";
import React from "react";

import { images } from "../components/carousel/profileImage";
import { Carousel } from "../components/carousel/Carousel";

export default function AboutPage() {
  return (
    <main className=" flex h-screen w-screen overflow-hidden scrollbar-hide">
      <section className="relative inset-0 flex h-screen w-screen flex-col  overflow-hidden md:flex-row">
        <div className=" bg-transparent">
          <Carousel images={images} />
          <div className="absolute flex w-1/2 flex-col bg-[#101010] text-white">
            <div>Singer</div>
            <div>HANRORO</div>
          </div>
        </div>
      </section>
    </main>
  );
}
