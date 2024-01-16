import React from "react";

export default function BoardGridContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid  h-full w-full grid-cols-2 gap-5  md:grid-cols-4 md:gap-8">{children}</div>
  );
}
