import { useContext } from "react";
import { toast } from "react-toastify";

import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import { uploadBoardPost } from "@/apis/post";
import { queryKeys } from "@/apis/querykeys";
import { DEFAULT_UPDATED_POST } from "@/constants/updatedPost";
import { LogoutContext, UserDataContext } from "@/contexts/AuthContext";
import { BoardPosts, UpdatedPost } from "@/types/post";

export function useUploadBoardPost() {
  const queryClient = useQueryClient();
  const handleLogout = useContext(LogoutContext);
  const router = useRouter();
  const userData = useContext(UserDataContext);
  return useMutation({
    mutationFn: (formData: UpdatedPost) =>
      uploadBoardPost({
        imageUrl: formData.imageUrl,
        title: formData.title,
        content: formData.content,
        user: formData.user,
        accessToken: userData?.accessToken,
      }),
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.boardPosts });

      const newImageUrl = URL.createObjectURL(newPost.imageUrl);
      if (!userData) {
        toast.warn("로그인이 필요합니다.");
        return;
      }
      let copyNewPost = {
        ...DEFAULT_UPDATED_POST,
        ...newPost,
        user: {
          userId: userData.user.userId,
          nickname: userData.user.nickname,
        },
        imageUrl: newImageUrl,
      };
      const previousBoardPosts = queryClient.getQueryData<
        InfiniteData<BoardPosts>
      >(queryKeys.boardPosts);

      queryClient.setQueryData(
        queryKeys.boardPosts,
        (old: InfiniteData<BoardPosts>) => {
          const newArray = [...old.pages[0].pages];
          newArray.unshift(copyNewPost);
          return { ...old, pages: [{ ...old.pages[0], pages: newArray }] };
        },
      );

      return { previousBoardPosts };
    },
    onError: async (err: AxiosError, newPost, context) => {
      queryClient.setQueryData(
        queryKeys.boardPosts,
        context?.previousBoardPosts,
      );
      if (err.request.status === 401) {
        toast.error("로그인이 만료되었습니다.");
        handleLogout();
        router.replace("/");
        return;
      }

      toast.error("이미지 파일을 업로드하는데 실패했습니다.");
      return;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.boardPosts });
    },
  });
}
