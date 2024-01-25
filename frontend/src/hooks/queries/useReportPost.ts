import { useContext } from "react";
import { toast } from "react-toastify";

import { AxiosError } from "axios";

import { reportPost } from "@/apis/post";
import { queryKeys } from "@/apis/querykeys";
import { LogoutContext, UserDataContext } from "@/contexts/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useReportPost() {
  const { accessToken } = useContext(UserDataContext);
  const handleLogout = useContext(LogoutContext);
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => reportPost({ postId, accessToken }),
    onError: async (err: AxiosError) => {
      if (err.response?.status === 401) {
        toast.error("로그인이 만료되었습니다.");
        handleLogout();
        router.replace("/");
        return;
      }
      toast.error("게시물 신고에 실패했습니다.");
      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.boardPosts });
      toast.success("게시글 신고가 완료되었습니다.");
    },
  });
}
