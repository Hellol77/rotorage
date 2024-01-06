import { toast } from "react-toastify";
import { likePost } from "@/apis/post";
import { queryKeys } from "@/apis/querykeys";
import { BoardPosts, Post } from "@/types/post";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export default function useLikePost({
  _id,
  accessToken,
}: {
  _id: string;
  accessToken: string;
}) {
  const queryClient = useQueryClient();
  const useLikeRecentPost = () => {
    return useMutation({
      mutationFn: () => likePost({ accessToken, _id }),
      onMutate: async () => {
        const previousBoardPosts = queryClient.getQueryData([
          queryKeys.recentPosts,
        ]);
        await queryClient.cancelQueries({ queryKey: [queryKeys.recentPosts] });
        queryClient.setQueryData([queryKeys.recentPosts], (old: Post[]) => {
          const newPosts = old.map((post) => {
            if (post._id === _id) {
              return { ...post, isLiked: !post.isLiked };
            }
            return post;
          });
          return newPosts;
        });
        return { previousBoardPosts };
      },
      onError: (err, newPost, context) => {
        queryClient.setQueryData(
          [queryKeys.recentPosts],
          context?.previousBoardPosts,
        );
        toast.error("다시 시도해주세요.");
      },
      onSettled: () => {},
    });
  };

  const useLikeInfinitePost = () => {
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
        console.log("err", err);
        queryClient.setQueryData(
          [queryKeys.boardPosts],
          context?.previousBoardPosts,
        );
        toast.error("다시 시도해주세요.hkgjh");
      },
      onSettled: () => {},
    });
  };

  const mutateLikeRecentPost = useLikeRecentPost().mutate;
  const mutateLikeInfinitePost = useLikeInfinitePost().mutate;

  return { mutateLikeRecentPost, mutateLikeInfinitePost };
}
