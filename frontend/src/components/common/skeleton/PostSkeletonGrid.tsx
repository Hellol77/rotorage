"use client";
import React from "react";

import PostSkeletonCard from "@/components/common/skeleton/PostSkeletonCard";

export default function PostSkeletonGrid({ columns = 1 }: { columns?: number }) {
  return (
    <>
      {[...Array(columns)].map((_, i) => (
        <PostSkeletonCard key={i} />
      ))}
    </>
  );
}
