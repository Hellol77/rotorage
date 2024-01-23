import { useContext } from "react";
import { toast } from "react-toastify";

import { AxiosError } from "axios";

import { uploadBoardPost } from "@/apis/post";
import { queryKeys } from "@/apis/querykeys";
import { DEFAULT_UPDATED_POST } from "@/constants/updatedPost";
import { ACCESS_TOKEN_LOGOUT_STATE } from "@/constants/user";
import { LogoutContext, UserDataContext } from "@/contexts/AuthContext";
import { BoardPosts, UpdatedPost } from "@/types/post";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useUploadBoardPost() {
  const queryClient = useQueryClient();
  const handleLogout = useContext(LogoutContext);
  const router = useRouter();
  const { accessToken, user } = useContext(UserDataContext);
  return useMutation({
    mutationFn: (formData: UpdatedPost) =>
      uploadBoardPost({
        imageUrl: formData.imageUrl,
        title: formData.title,
        content: formData.content,
        user: formData.user,
        accessToken: accessToken,
      }),
    onMutate: async (newPost) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.boardPosts });

      await queryClient.cancelQueries({ queryKey: queryKeys.boardPosts });

      const newImageUrl = URL.createObjectURL(newPost.imageUrl);
      if (ACCESS_TOKEN_LOGOUT_STATE.includes(accessToken)) {
        toast.warn("로그인이 필요합니다.");
        return;
      }
      let copyNewPost = {
        ...DEFAULT_UPDATED_POST,
        ...newPost,
        user,
        imageUrl: newImageUrl,
      };
      const previousBoardPosts = queryClient.getQueryData<InfiniteData<BoardPosts>>(
        queryKeys.boardPosts,
      );

      queryClient.setQueryData(queryKeys.boardPosts, (old: InfiniteData<BoardPosts>) => {
        const newArray = [...old.pages[0].pages];
        newArray.unshift(copyNewPost);
        return { ...old, pages: [{ ...old.pages[0], pages: newArray }] };
      });

      return { previousBoardPosts };
    },
    onSuccess: () => {
      toast.success("게시글이 업로드되었습니다.");
    },
    onError: async (err: AxiosError, newPost, context) => {
      queryClient.setQueryData(queryKeys.boardPosts, context?.previousBoardPosts);
      if (err.response?.status === 401) {
        toast.error("로그인이 만료되었습니다.");
        handleLogout();
        router.replace("/");
        return;
      }

      toast.error("게시물 업로드에 실패했습니다.");
      return;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.boardPosts });
    },
  });
}
