import React from "react";

import Image from "next/image";

// import gallery11 from "/../../public/photo/gallery/gallery11.png";
import gallery11 from "../../../../public/photo/gallery/gallery11.png";

export default function ProfileAvatar() {
  return (
    <span
      tabIndex={-1}
      className=" bg-default text-tiny text-default-foreground ring-default ring-offset-background data-[focus-visible=true]:outline-focus relative z-10 mr-8 box-border flex h-20 w-20 items-center justify-center overflow-hidden rounded-full align-middle outline-none ring-2 ring-offset-2 data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 md:h-36 md:w-36"
    >
      <Image
        src={gallery11}
        className=" flex h-full w-full object-cover  transition-opacity !duration-500"
        alt="profile"
        width={144}
        height={144}
      />
    </span>
  );
}
