import { useContext } from "react";
import { toast } from "react-toastify";

import { AxiosError } from "axios";

import { deletePost } from "@/apis/post";
import { queryKeys } from "@/apis/querykeys";
import { UserDataContext } from "@/contexts/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeletePost() {
  const queryClient = useQueryClient();
  const { accessToken } = useContext(UserDataContext);
  return useMutation({
    mutationFn: (postId: string) => deletePost({ postId, accessToken }),
    // onMutate: async () => {
    //   await queryClient.invalidateQueries({ queryKey: queryKeys.boardPosts });
    //   await queryClient.cancelQueries({ queryKey: queryKeys.boardPosts });

    //   const previousBoardPosts = queryClient.getQueryData<InfiniteData<BoardPosts>>(
    //     queryKeys.boardPosts,
    //   );
    // },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.boardPosts });
      await queryClient.invalidateQueries({ queryKey: queryKeys.recentPosts });
      toast.success("게시글이 삭제되었습니다.");
    },
    onError: async (err: AxiosError) => {
      toast.error("게시글을 삭제하는데 실패했습니다.");
    },
  });
}
