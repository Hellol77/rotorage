"use client";
import React, { Fragment, useEffect, useRef } from "react";

import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { useInView } from "framer-motion";

import Loading from "@/app/board/loading";
import BoardPhotoCard from "@/components/common/card/BoardPhotoCard";
import BoardLoadingIcon from "@/components/common/icon/BoardLoadingIcon";
import BoardGridContainer from "@/components/common/ui/container/BoardGridContainer";
import { Post } from "@/types/post";
import useRefreshScrollReset from "@/utils/useRefreshScrollReset";

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

  return (
    <>
      {isPending ? (
        <Loading />
      ) : (
        <BoardGridContainer>
          {data?.pages?.map(({ pages, pageParams }) => (
            <Fragment key={pageParams || 0}>
              {pages.map((post: Post) => (
                <BoardPhotoCard
                  key={post._id}
                  post={post}
                  type="infinite"
                  queryKey={queryKey}
                />
              ))}
            </Fragment>
          ))}
        </BoardGridContainer>
      )}
      <div ref={ref} className="my-[10%] flex h-4 w-full justify-center">
        {isFetchingNextPage ? (
          <BoardLoadingIcon className="h-8 w-8 text-black" />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
