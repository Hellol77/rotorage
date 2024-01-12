"use client";
import React from "react";

import { Card, Skeleton } from "@nextui-org/react";

import BoardGridContainer from "@/components/common/ui/container/BoardGridContainer";

const n = 4;

export default function Loading() {
  return (
    <BoardGridContainer>
      {[...Array(n)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </BoardGridContainer>
  );
}

function SkeletonCard() {
  return (
    <Card className="flex h-full flex-col gap-4 p-4">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300 md:h-[35vh]"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>
    </Card>
  );
}
