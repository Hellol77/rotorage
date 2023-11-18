import { uploadBoardPost } from "@/app/api/board";
import { getBoardPosts } from "./../../app/api/board/index";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Post } from "@/model/post";

export function useGetBoardPosts() {
  return useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: async ({ pageParam }) => {
      const res = await getBoardPosts({ pageParam });
      return res;
    },
    initialPageParam: 1,
    // 아래 코드를 타입스크립트로 바꿔줘
    getNextPageParam: (lastPage, allPage) =>
      lastPage.data.length != 0 ? lastPage.pageParam : undefined,
  });
}

export function useUploadBoardPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      imageUrl,
      title,
      content,
    }: {
      imageUrl: File;
      title: string;
      content: string;
    }) => {
      const formData = new FormData();
      formData.append("imgFile", imageUrl);
      formData.append("title", title);
      formData.append("content", content);
      return uploadBoardPost(formData);
    },
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: ["boardPosts"] });

      const newImageUrl = URL.createObjectURL(newPost.imageUrl);

      let copyNewPost = {
        ...newPost,
        imageUrl: newImageUrl,
      };
      const previousBoardPosts = queryClient.getQueryData(["boardPosts"]);

      queryClient.setQueryData(["boardPosts"], (old: Post[]) => [
        copyNewPost,
        ...old,
      ]);

      return { previousBoardPosts };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(["boardPosts"], context?.previousBoardPosts);
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ["boardPosts"] });
    // },
  });
}
