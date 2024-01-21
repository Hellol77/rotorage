import { useContext } from "react";
import { toast } from "react-toastify";

import { AxiosError } from "axios";

import { addComment } from "@/apis/post";
import { queryKeys } from "@/apis/querykeys";
import { ACCESS_TOKEN_LOGOUT_STATE } from "@/constants/user";
import { LogoutContext, UserDataContext } from "@/contexts/AuthContext";
import { BoardPosts, InfiniteBoardPosts, Post } from "@/types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAddComment(postId: string) {
  const { accessToken, user } = useContext(UserDataContext);
  const handleLogout = useContext(LogoutContext);

  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: queryKeys.addComment(postId),
    mutationFn: async ({ content }: { content: string }) =>
      await addComment({ content, postId, accessToken }),
    // onMutate: async (newComment) => {
    // await queryClient.cancelQueries({ queryKey: queryKeys.boardPosts });
    // if (ACCESS_TOKEN_LOGOUT_STATE.includes(accessToken)) {
    //   // toast.warn("로그인이 필요합니다.");
    //   handleLogout();
    //   return;
    // }
    // const previousBoardPosts = queryClient.getQueryData(queryKeys.boardPosts);
    // await queryClient.setQueryData(queryKeys.boardPosts, (old: InfiniteBoardPosts) => {
    //   const newPages = old.pages.map((page: BoardPosts) => {
    //     const newPage = page.pages.map((post: Post) => {
    //       if (post._id === postId) {
    //         const newCommentArray = [...post.comments];
    //         newCommentArray.unshift({
    //           _id: new Date().getTime().toString(),
    //           content: newComment.content,
    //           user,
    //           createdAt: new Date(),
    //         });
    //         return { ...post, comments: newCommentArray };
    //       }
    //       return post;
    //     });
    //     return { ...page, pages: newPage };
    //   });
    //   return { ...old, pages: newPages };
    // });
    // return { previousBoardPosts };
    // },
    onError: (err: AxiosError, newComment, context: any) => {
      // queryClient.setQueryData(queryKeys.boardPosts, context.previousBoardPosts);

      if (err.response?.status === 401) {
        toast.warn("로그인이 필요합니다.");
        handleLogout();
        return;
      }
      toast.error("댓글 작성에 실패했습니다.");
    },
    onSuccess: () => {
      console.log("성공");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.boardPosts });
      await queryClient.invalidateQueries({ queryKey: queryKeys.recentPosts });
    },
  });
}
