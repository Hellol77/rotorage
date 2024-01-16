import { toast } from "react-toastify";

import { dislikePost, likePost } from "@/apis/post";
import { Post } from "@/types/post";
import {  useMutation, useQueryClient } from "@tanstack/react-query";

export default function useLikePost({
  _id,
  accessToken,
  queryKey,
}: {
  _id: string;
  accessToken: string;
  queryKey?: string[];
}) {
  const queryClient = useQueryClient();
  const useLikeDefaultPost = (queryKey: string[]) => {
    return useMutation({
      mutationFn: () => likePost({ accessToken, _id }),
      onMutate: async () => {
        const previousBoardPosts = queryClient.getQueryData(queryKey);
        await queryClient.cancelQueries({ queryKey });
        queryClient.setQueryData(queryKey, (old: Post[]) => {
          const newPosts = old.map((post) => {
            if (post._id === _id) {
              return { ...post, isLiked: !post.isLiked };
            }
            return post;
          });
          return newPosts;
        });
        return { previousBoardPosts };
      },
      onError: (err, newPost, context) => {
        queryClient.setQueryData(queryKey, context?.previousBoardPosts);
        toast.error("다시 시도해주세요.");
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    });
  };

  const useLikeInfinitePost = (queryKey: string[]) => {
    return useMutation({
      mutationFn: ({ likeState }: { likeState: boolean }) => {
        if (likeState) return dislikePost({ accessToken, _id });
        return likePost({ accessToken, _id });
      },
      // onMutate: async () => {
      //   const previousBoardPosts = queryClient.getQueryData(queryKey);
      //   await queryClient.cancelQueries({ queryKey });
      //   queryClient.setQueryData(queryKey, (old: InfiniteData<BoardPosts>) => {
      //     const newPages = old.pages.map((page) => {
      //       const newPost = page.pages.map((post) => {
      //         if (post._id === _id) {
      //           return {
      //             ...post,
      //             likeCount: post.isLiked ? post.likeCount - 1 : post.likeCount + 1,
      //             isLiked: !post.isLiked,
      //           };
      //         }
      //         return post;
      //       });

      //       const newPage = { ...page, pages: newPost };
      //       return newPage;
      //     });
      //     return { ...old, pages: newPages };
      //   });
      //   return { previousBoardPosts };
      // },
      onError: (err, newPost, context) => {
        console.log("err", err);
        // queryClient.setQueryData(queryKey, context?.previousBoardPosts);
        toast.error("다시 시도해주세요.");
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    });
  };

  const mutateLikeDefailtPost = useLikeDefaultPost(queryKey || []).mutate;
  const mutateLikeInfinitePost = useLikeInfinitePost(queryKey || []).mutate;

  return { mutateLikeDefailtPost, mutateLikeInfinitePost };
}
