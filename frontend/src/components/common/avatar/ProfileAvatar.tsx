import React from "react";

import Image from "next/image";

import defaultProfileImage from "../../../../public/defaultProfileImage.png";
export default function ProfileAvatar({
  className,
  size,
  profileImage,
}: {
  className?: string;
  profileImage?: string | File;
  size: "small" | "medium" | "large";
}) {
  return (
    <div
      tabIndex={-1}
      className={`text-tiny text-default-foreground ring-default ring-offset-background  data-[focus-visible=true]:outline-focus relative z-10  box-border flex flex-shrink-0   items-center justify-center overflow-hidden rounded-full align-middle outline-none ring-2 ring-offset-2 data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2   ${getSize(size)} ${className}`}
    >
      <Image
        src={profileImage ? validateFileString(profileImage) : defaultProfileImage}
        className="  h-full    object-cover transition-opacity !duration-500"
        alt="profile"
        fill
      />
    </div>
  );
}

const validateFileString = (profileImage: string | File) => {
  if (typeof profileImage === "string") {
    return profileImage;
  }
  return URL.createObjectURL(profileImage);
};

const getSize = (size: "small" | "medium" | "large") => {
  switch (size) {
    case "small":
      return "h-10 w-10 md:h-12 md:w-12";
    case "medium":
      return "h-12 w-12 md:h-16 md:w-16";
    case "large":
      return "h-28 w-28 md:h-36 md:w-36";
    default:
      return "h-28 w-28 md:h-36 md:w-36";
  }
};
