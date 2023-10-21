import YoutubeIcon from "@/app/icon/YoutubeIcon";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

export default function AlbumItem({
  title,
  subtitle,
  album,
  url,
  className,
}: {
  title: string;
  subtitle: string;
  album: StaticImageData;
  url: string;
  className?: string;
}) {
  return (
    <ol
      className={`md:w-min-[14rem]  flex w-full  gap-4 rounded-lg bg-gray-800 bg-opacity-20  md:gap-4 ${className}`}
    >
      <Image
        src={album}
        className=" w-20 rounded-md md:w-24 "
        alt={`${album}`}
      />
      <div className="flex w-full flex-col justify-center md:w-full">
        <p className=" flex w-full items-center justify-between whitespace-pre-wrap font-poorStory  text-xl md:w-full    md:text-xl">
          {title}
          <Link
            className=" mr-2 md:ml-2 md:mr-2"
            href={`${url}`}
            target="_blank"
          >
            <YoutubeIcon size="24" />
          </Link>
        </p>
        <p className="w-full text-sm">{subtitle}</p>
      </div>
    </ol>
  );
}
