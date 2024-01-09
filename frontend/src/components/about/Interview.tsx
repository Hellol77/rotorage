import React from "react";

import MoreText from "@/components/common/ui/MoreText";
import { INTERVIEW } from "@/constants/about";

export default function Interview() {
  return (
    <ul className="relative z-20 mb-12 mt-12 px-4 text-white md:mt-4  md:flex md:w-full md:flex-col md:items-end md:px-20">
      <div className=" w-full md:w-96 md:text-xl">
        <li className=" mb-4 text-3xl font-bold tracking-wider md:text-4xl">
          Interview
        </li>
        {INTERVIEW.map(({ content, url }) => {
          return (
            <ol key={url}>
              <p className="font-poorStory text-slate-300">{content}</p>
              <MoreText text="MORE" url={url} />
            </ol>
          );
        })}
      </div>
    </ul>
  );
}
