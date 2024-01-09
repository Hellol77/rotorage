import React from "react";

import Line from "@/components/common/ui/Line";

export default function Lines() {
  return (
    <div className=" z-0 flex h-full w-full flex-col items-center justify-center gap-16 md:mt-10 md:gap-20 2xl:gap-40">
      <Line
        text={`Even if you leave `}
        color="red"
        deg="1.758deg"
        vector={-1}
      />
      <Line
        text="Let Me Love My Youth "
        color="yellow"
        deg="-1.344deg"
        vector={1}
      />
      <Line
        text="The last stop of our pain "
        color="green"
        deg="1.5deg"
        vector={-1}
      />
      <Line text="Landing in Love " color="blue" deg="-2.717deg" vector={1} />
    </div>
  );
}
