import { Post } from "@/model/post";
import React from "react";

export const getBoardPosts = async () => {
  const api = fetch(process.env.NEXT_PUBLIC_BASE_URL + "board")
    .then(async (res) => {
      const data: Post[] = await res.json();
      return data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
  return api;
};

export const uploadBoardPost = async (formData: FormData) => {
  return fetch(process.env.NEXT_PUBLIC_BASE_URL + "board", {
    method: "POST",

    body: formData,
  });
};
