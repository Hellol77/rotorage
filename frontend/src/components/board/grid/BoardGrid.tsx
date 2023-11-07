"use client";
import React from "react";
import BoardPhotoCard from "./BoardPhotoCard";
import { useGetBoardPosts } from "@/hooks/queries/boardPosts";

export default function BoardGrid() {
  const { data } = useGetBoardPosts();
  console.log(data);
  return (
    <div className="grid w-full grid-cols-2 gap-5  md:grid-cols-4 md:gap-4">
      {data?.map(({ title, content, imageUrl }) => (
        <BoardPhotoCard
          key={imageUrl}
          title={title}
          content={content}
          imageUrl={imageUrl}
        />
      ))}
    </div>
  );
}
