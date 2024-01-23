import { useContext } from "react";
import { toast } from "react-toastify";

import { AxiosError } from "axios";

import { deleteComment } from "@/apis/post";
import { queryKeys } from "@/apis/querykeys";
import { UserDataContext } from "@/contexts/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteComment() {
  const queryClient = useQueryClient();

  const { accessToken } = useContext(UserDataContext);
  return useMutation({
    mutationFn: (commentId: string) => deleteComment({ commentId, accessToken }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.boardPosts });
      await queryClient.invalidateQueries({ queryKey: queryKeys.recentPosts });
      toast.success("댓글이 삭제되었습니다.");
    },
    onError: async (err: AxiosError) => {
      console.log(err);
      toast.error("댓글을 삭제하는데 실패했습니다.");
    },
  });
}
