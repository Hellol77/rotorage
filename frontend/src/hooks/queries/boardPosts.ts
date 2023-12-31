import { toast } from "react-toastify";
import { useContext } from "react";
import { uploadBoardPost } from "@/apis/board";
import { getBoardPosts } from "../../apis/board/index";
import {
  InfiniteData,
  useSuspenseInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Post, UpdatedPost } from "@/types/post";
import { UserDataContext } from "@/contexts/AuthContext";

interface BoardPosts {
  pages: Post[];
  pageParams: number;
}

export function useGetBoardPosts() {
  return useSuspenseInfiniteQuery({
    queryKey: ["boardPosts"],
    queryFn: async ({ pageParam }) => {
      const res = await getBoardPosts({ pageParam });
      return res;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) =>
      lastPage.pages.length >= 12 ? lastPage.pageParams : undefined,
  });
}

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
      await queryClient.cancelQueries({ queryKey: ["boardPosts"] });

      const newImageUrl = URL.createObjectURL(newPost.imageUrl);
      if (!userData) {
        toast.warn("로그인이 필요합니다.");
        return;
      }
      let copyNewPost = {
        ...newPost,
        user: {
          userId: userData.user.userId,
          nickname: userData.user.nickname,
        },
        imageUrl: newImageUrl,
      };
      const previousBoardPosts = queryClient.getQueryData<
        InfiniteData<BoardPosts>
      >(["boardPosts"]);

      queryClient.setQueryData(
        ["boardPosts"],
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
      queryClient.setQueryData(["boardPosts"], context?.previousBoardPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["boardPosts"] });
    },
  });
}
