import { Post } from "@/model/post";
import React from "react";

export const getBoardPosts = async ({ pageParam }: { pageParam: number }) => {
  const api = fetch(process.env.NEXT_PUBLIC_BASE_URL + `board/${pageParam}`)
    .then(async (res) => {
      const data: Post[] = await res.json();
      return { data, pageParam: pageParam + 1 };
    })
    .catch((err) => {
      console.log(err);
      alert("게시글을 불러오는데 실패했습니다.");
      return { data: [], pageParam: undefined };
    });
  return api;
};

export const uploadBoardPost = async (formData: FormData) => {
  return fetch(process.env.NEXT_PUBLIC_BASE_URL + "board", {
    method: "POST",

    body: formData,
  });
};
