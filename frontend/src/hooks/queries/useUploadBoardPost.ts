import { toast } from "react-toastify";
import { useContext } from "react";
import { uploadBoardPost } from "@/apis/post";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { BoardPosts, UpdatedPost } from "@/types/post";
import { UserDataContext } from "@/contexts/AuthContext";
import { DEFAULT_UPDATED_POST } from "@/constants/updatedPost";
import { queryKeys } from "@/apis/querykeys";

export function useUploadBoardPost() {
  const queryClient = useQueryClient();
  const userData = useContext(UserDataContext);
  return useMutation({
    mutationFn: (formData: UpdatedPost) =>
      uploadBoardPost({
        imageUrl: formData.imageUrl,
        title: formData.title,
        content: formData.content,
        user: formData.user,
      }),
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: [queryKeys.boardPosts] });

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
      >([queryKeys.boardPosts]);

      queryClient.setQueryData(
        [queryKeys.boardPosts],
        (old: InfiniteData<BoardPosts>) => {
          const newArray = [...old.pages[0].pages];
          newArray.unshift(copyNewPost);
          return { ...old, pages: [{ ...old.pages[0], pages: newArray }] };
        },
      );

      return { previousBoardPosts };
    },
    onError: (err, newPost, context) => {
      console.log("err", err);
      queryClient.setQueryData(
        [queryKeys.boardPosts],
        context?.previousBoardPosts,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.boardPosts] });
    },
  });
}
