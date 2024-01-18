import React from "react";

import Image from "next/image";

import gallery11 from "../../../../public/photo/gallery/gallery11.png";

export default function ProfileAvatar({
  className,
  size,
}: {
  className?: string;
  size: "small" | "medium" | "large";
}) {
  return (
    <div
      tabIndex={-1}
      className={`text-tiny text-default-foreground ring-default ring-offset-background  data-[focus-visible=true]:outline-focus relative z-10  box-border flex flex-shrink-0   items-center justify-center overflow-hidden rounded-full align-middle outline-none ring-2 ring-offset-2 data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2   ${getSize(size)} ${className}`}
    >
      <Image
        src={gallery11}
        className="  h-full    object-cover transition-opacity !duration-500"
        alt="profile"
        width={144}
        height={144}
      />
    </div>
  );
}

const getSize = (size: "small" | "medium" | "large") => {
  switch (size) {
    case "small":
      return "h-10 w-10 md:h-12 md:w-12";
    case "medium":
      return "h-12 w-12 md:h-16 md:w-16";
    case "large":
      return "h-20 w-20 md:h-36 md:w-36";
    default:
      return "h-20 w-20 md:h-36 md:w-36";
  }
};
