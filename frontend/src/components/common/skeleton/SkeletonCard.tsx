import React from "react";

import { Card, Skeleton } from "@nextui-org/react";

export default function SkeletonCard() {
  return (
    <Card className="flex h-full flex-col gap-4 p-4">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300 md:h-[35vh]"></div>
      </Skeleton>
    </Card>
  );
}
