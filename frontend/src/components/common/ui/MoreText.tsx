import Link from "next/link";
import React from "react";
import RightArrow from "../icon/RightArrow";

export default function MoreText({
  text,
  url,
  color,
}: {
  text: string;
  url: string;
  color?: string;
}) {
  return (
    <Link
      href={url}
      className={`mt-4 flex w-fit items-center border-b-2 ${getColor(
        color,
      )}  font-poorStory text-xl `}
      target="_blank"
    >
      {text}
      <RightArrow size="22" />
    </Link>
  );
}

const getColor = (color: string | undefined) => {
  switch (color) {
    case "melon":
      return "border-[#00cd3c] fill-[#00cd3c] stroke-[#00cd3c] text-[#00cd3c]";
    default:
      return "border-slate-400 fill-slate-400 stroke-slate-400 text-slate-400";
  }
};
