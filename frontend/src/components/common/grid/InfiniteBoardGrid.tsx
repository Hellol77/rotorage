import React, { Fragment, useEffect, useMemo, useRef } from "react";

import BoardPhotoCard from "@/components/common/card/boardPhotoCard/BoardPhotoCard";
import BoardGridContainer from "@/components/common/container/BoardGridContainer";
import BoardLoadingIcon from "@/components/common/icon/BoardLoadingIcon";
import PostSkeletonGrid from "@/components/common/skeleton/PostSkeletonGrid";
import { Post } from "@/types/post";
import useRefreshScrollReset from "@/utils/useRefreshScrollReset";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { useInView } from "framer-motion";

interface InfiniteBoardGridProps {
  isPending: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<
        | {
            pages: any;
            pageParams: number;
          }
        | {
            pages: never[];
            pageParams: undefined;
          },
        unknown
      >,
      Error
    >
  >;
  data:
    | InfiniteData<
        | {
            pages: any;
            pageParams: number;
          }
        | {
            pages: never[];
            pageParams: undefined;
          },
        unknown
      >
    | undefined;
  queryKey: string[];
}

export default function InfiniteBoardGrid({
  data,
  fetchNextPage,
  isFetchingNextPage,
  isPending,
  queryKey,
}: InfiniteBoardGridProps) {
  // const { data, fetchNextPage, isFetchingNextPage, isPending } =
  //   useGetBoardPosts();
  const ref = useRef(null);
  const isInView = useInView(ref);
  useEffect(() => {
    if (isInView && !isPending) {
      fetchNextPage();
    }
  }, [fetchNextPage, isInView, data, isPending]);
  useRefreshScrollReset();

  const useMemoBoardLoading = useMemo(
    () => (
      <div ref={ref} className="my-8 flex h-4 w-full justify-center">
        {isFetchingNextPage ? <BoardLoadingIcon className="h-8 w-8 text-black" /> : ""}
      </div>
    ),
    [isFetchingNextPage],
  );

  return (
    <>
      <BoardGridContainer>
        {isPending ? (
          <PostSkeletonGrid columns={4} />
        ) : (
          <>
            {data?.pages?.map(({ pages, pageParams }) => (
              <Fragment key={pageParams || 0}>
                {pages.map((post: Post) => (
                  <BoardPhotoCard key={post._id} post={post} type="infinite" queryKey={queryKey} />
                ))}
              </Fragment>
            ))}
          </>
        )}
      </BoardGridContainer>

      {/* <div ref={ref} className="my-8 flex h-4 w-full justify-center">
        {isFetchingNextPage ? <BoardLoadingIcon className="h-8 w-8 text-black" /> : ""}
      </div> */}
      {useMemoBoardLoading}
    </>
  );
}
