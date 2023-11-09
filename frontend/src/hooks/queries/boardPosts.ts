import { uploadBoardPost } from "@/app/api/board";
import { getBoardPosts } from "./../../app/api/board/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Post } from "@/model/post";

export function useGetBoardPosts() {
  return useQuery({
    queryKey: ["boardPosts"],
    queryFn: getBoardPosts,
  });
}

export function useUploadBoardPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      imageUrl,
      title,
      content,
    }: {
      imageUrl: File;
      title: string;
      content: string;
    }) => {
      const formData = new FormData();
      formData.append("imgFile", imageUrl);
      formData.append("title", title);
      formData.append("content", content);
      return uploadBoardPost(formData);
    },
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: ["boardPosts"] });

      const newImageUrl = URL.createObjectURL(newPost.imageUrl);

      let copyNewPost = {
        ...newPost,
        imageUrl: newImageUrl,
      };
      const previousBoardPosts = queryClient.getQueryData(["boardPosts"]);

      queryClient.setQueryData(["boardPosts"], (old: Post[]) => [
        copyNewPost,
        ...old,
      ]);

      return { previousBoardPosts };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(["boardPosts"], context?.previousBoardPosts);
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ["boardPosts"] });
    // },
  });
}
