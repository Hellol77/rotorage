import React from "react";

import Image from "next/image";

// import gallery11 from "/../../public/photo/gallery/gallery11.png";
import gallery11 from "../../../../public/photo/gallery/gallery11.png";

export default function ProfileAvatar({
  className,
  size,
}: {
  className?: string;
  size: "small" | "medium" | "large";
}) {
  return (
    <span
      tabIndex={-1}
      className={` text-tiny text-default-foreground  ring-default ring-offset-background data-[focus-visible=true]:outline-focus h- relative z-10 box-border flex  items-center justify-center overflow-hidden rounded-full align-middle outline-none ring-2 ring-offset-2 data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2   ${getSize(size)} ${className}`}
    >
      <Image
        src={gallery11}
        className=" flex h-full w-full   object-cover transition-opacity !duration-500"
        alt="profile"
        width={144}
        height={144}
      />
    </span>
  );
}

const getSize = (size: "small" | "medium" | "large") => {
  switch (size) {
    case "small":
      return "h-8 w-8 md:h-16 md:w-16";
    case "medium":
      return "h-12 w-12 md:h-16 md:w-16";
    case "large":
      return "h-20 w-20 md:h-36 md:w-36";
    default:
      return "h-20 w-20 md:h-36 md:w-36";
  }
};
