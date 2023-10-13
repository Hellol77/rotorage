import React from "react";
import Line from "./Line";

export default function Lines() {
  return (
    <div className="flex w-full flex-col gap-16 md:mt-10 md:gap-20 2xl:gap-56">
      <Line text={`Even if you leave `} color="red" deg="1deg" direction={-1} />
      <Line
        text="Let Me Love My Youth "
        color="yellow"
        deg="28deg"
        direction={-1}
      />
      <Line
        text="The last stop of our pain "
        color="green"
        deg="1deg"
        direction={-1}
      />
      <Line text="Landing in Love " color="blue" deg="6deg" direction={-1} />
    </div>
  );
}
