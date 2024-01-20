import { useContext } from "react";

import { addComment } from "@/apis/post";
import { queryKeys } from "@/apis/querykeys";
import { UserDataContext } from "@/contexts/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAddComment(postId: string) {
  const { accessToken, user } = useContext(UserDataContext);
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: queryKeys.addComment(postId),
    mutationFn: async (content: string) => {
      const res = await addComment({ postId, content, accessToken });
      return res;
    },
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.boardPosts });
      if (accessToken === "") {
        return;
      }
      const previousBoardPosts = queryClient.getQueryData(queryKeys.boardPosts);

      queryClient.setQueryData(queryKeys.boardPosts, (old: any) => {
        const newArray = old.pages.map((page: any) => {
          return page.pages.map((post: any) => {
            if (post.id === postId) {
              const newCommentArray = [...post.comments];
              newCommentArray.unshift({
                comment: newComment,
                user,
                createdAt: new Date(),
              });
              return { ...post, comments: newCommentArray };
            }
            return post;
          });
        });

        return { ...old, pages: newArray };
      });
      return { previousBoardPosts };
    },
  });
}
