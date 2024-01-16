import React from "react";

import VideoSection from "@/components/common/section/VideoSection";

export default function VideoPage() {
  return (
    <main className="z-1 h-full w-screen overflow-x-hidden overflow-y-scroll scrollbar-hide md:h-screen md:snap-y  md:snap-mandatory">
      <VideoSection title="입춘" />
      <VideoSection title="정류장" />
      <VideoSection title="화해" />
      <VideoSection title="사랑하게 될 거야" />
    </main>
  );
}
