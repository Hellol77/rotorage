import { likePost } from "@/apis/post";
import { queryKeys } from "@/apis/querykeys";
import { BoardPosts } from "@/types/post";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { off } from "process";

export default function useLikePost({
  _id,
  accessToken,
}: {
  _id: string;
  accessToken: string;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => likePost({ accessToken, _id }),
    onMutate: async () => {
      const previousBoardPosts = queryClient.getQueryData([
        queryKeys.boardPosts,
      ]);
      await queryClient.cancelQueries({ queryKey: [queryKeys.boardPosts] });
      queryClient.setQueryData(
        [queryKeys.boardPosts],
        (old: InfiniteData<BoardPosts>) => {
          const newPages = old.pages.map((page) => {
            const newPost = page.pages.map((post) => {
              if (post._id === _id) {
                return { ...post, isLiked: !post.isLiked };
              }
              return post;
            });

            const newPage = { ...page, pages: newPost };
            return newPage;
          });
          return { ...old, pages: newPages };
        },
      );
      return { previousBoardPosts };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(
        [queryKeys.boardPosts],
        context?.previousBoardPosts,
      );
    },
    onSettled: () => {},
  });
}
