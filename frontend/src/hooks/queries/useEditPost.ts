import { useContext } from "react";
import { toast } from "react-toastify";

import { AxiosError } from "axios";

import { editPost } from "@/apis/post";
import { queryKeys } from "@/apis/querykeys";
import { LogoutContext, UserDataContext } from "@/contexts/AuthContext";
import { UpdatedPost, UpdatePostPropsType } from "@/types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useEditPost(postId: string) {
  const { accessToken } = useContext(UserDataContext);
  const handleLogout = useContext(LogoutContext);
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatedPost) => {
      // const formData = new FormData();
      // const formDataWithPostId = { ...data, postId };
      // console.log("postid", postId);
      // Object.entries(formDataWithPostId).forEach(([key, value]) => {
      //   formData.append(key, value);
      // });
      // console.log(formData);
      return editPost({ data, postId, accessToken });
    },
    onError: async (err: AxiosError) => {
      if (err.response?.status === 401) {
        toast.error("로그인이 만료되었습니다.");
        handleLogout();
        router.replace("/");
        return;
      }
      toast.error("게시물 업로드에 실패했습니다.");
      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.boardPosts });
      toast.success("게시글이 수정되었습니다.");
    },
  });
}
