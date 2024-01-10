import React from "react";

import BoardHeader from "@/components/board/BoardHeader";
import BoardGrid from "@/components/board/grid/BoardGrid";
import MainContainer from "@/components/common/ui/container/MainContainer";

export default function BoradPage() {
  return (
    <MainContainer>
      <BoardHeader />
      <BoardGrid />
    </MainContainer>
  );
}
