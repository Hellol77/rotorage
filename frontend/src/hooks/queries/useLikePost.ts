import { toast } from "react-toastify";

import { dislikePost, likePost } from "@/apis/post";
import { queryKeys } from "@/apis/querykeys";
import { BoardPosts, Post } from "@/types/post";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";

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

  return useMutation({
    mutationKey: queryKeys.likePost(_id),
    mutationFn: ({ likeState }: { likeState: boolean }) => {
      if (likeState) return dislikePost({ accessToken, _id });
      return likePost({ accessToken, _id });
    },
    onMutate: async () => {
      if(queryKey === queryKeys.recentPosts ){
        const previousBoardPosts = queryClient.getQueryData(queryKey);
        await queryClient.cancelQueries({ queryKey });
        queryClient.setQueryData(queryKey, (old: Post[]) => {
          const newPosts = old.map((post) => {
            if (post._id === _id) {
              return { ...post, isLiked: !post.isLiked, likeCount: post.isLiked ? post.likeCount - 1 : post.likeCount + 1};
            }
            return post;
          });
          return newPosts;
        });
        return { previousBoardPosts };
      }
      const previousBoardPosts = queryClient.getQueryData(queryKey || []);
      await queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData(queryKey || [], (old: InfiniteData<BoardPosts>) => {
        const newPages = old.pages.map((page) => {
          const newPost = page.pages.map((post) => {
            if (post._id === _id) {
              return {
                ...post,
                likeCount: post.isLiked ? post.likeCount - 1 : post.likeCount + 1,
                isLiked: !post.isLiked,
              };
            }
            return post;
          });

          const newPage = { ...page, pages: newPost };
          return newPage;
        });
        return { ...old, pages: newPages };
      });
      return { previousBoardPosts };
    },
    onError: (err, newPost, context) => {
      console.log("err", err);
      // queryClient.setQueryData(queryKey, context?.previousBoardPosts);
      toast.error("다시 시도해주세요.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
