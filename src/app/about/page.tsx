import Image from "next/image";
import React from "react";
import Profile1 from "/public/photo/profile/profile1.png";
import Profile2 from "/public/photo/profile/profile2.png";
export default function AboutPage() {
  return (
    <main className="z-1 h-full w-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll scrollbar-hide">
      <section>
        <Image src={Profile1} className="w-40" alt="hanroroProfile" />
        <Image src={Profile2} className="w-60" alt="hanroroProfile" />
      </section>
    </main>
  );
}
