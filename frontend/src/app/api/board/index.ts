"use client";
import { post } from "@/model/post";
import React from "react";

export const getBoardPosts = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "board");
  const data: post[] = await res.json();
  return data;
};

export const uploadBoardPost = async (formData: FormData) => {
  await fetch(process.env.NEXT_PUBLIC_BASE_URL + "board", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
    },
    body: formData,
  });
};
