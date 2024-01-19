import React from "react";

export default function BoardGridContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className=" grid  h-full w-full grid-cols-2 gap-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4 md:gap-x-10 md:gap-y-20">
      {children}
    </div>
  );
}
