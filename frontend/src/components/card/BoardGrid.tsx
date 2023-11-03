import React from "react";
import BoardPhotoCard from "./BoardPhotoCard";
import { getBoardPosts } from "@/app/api/board";

export default async function BoardGrid() {
  const posts = await getBoardPosts();
  console.log(posts);
  return (
    <div className="   grid  grid-cols-2 gap-5 md:w-full md:grid-cols-4 md:gap-4">
      {/* <BoardPhotoCard
        image={gallery5}
        title={"자색고구마로로"}
        content="생일 축하해!qwdqwdwqdwqdwqdwqdqwqwdqwwqwqdqwdqwdwqdqwd"
        id={"1"}
      /> */}
      {posts.map(({ _id, title, content, imageUrl }) => (
        <BoardPhotoCard
          key={_id}
          id={_id}
          title={title}
          content={content}
          imageUrl={imageUrl}
        />
      ))}
    </div>
  );
}
