import React from "react";

import MainContainer from "@/components/common/ui/container/MainContainer";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <MainContainer className="flex-col  md:flex-row">
      <section className="h-40 w-full rounded-lg dark:bg-[#333333] md:mr-4 md:h-[750px] md:w-60"></section>
      {children}
    </MainContainer>
  );
}
