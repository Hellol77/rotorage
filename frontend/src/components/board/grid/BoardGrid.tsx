"use client";
import React, { Fragment, useEffect, useRef } from "react";

import { useInView } from "framer-motion";

import Loading from "@/app/board/loading";
import BoardLoadingIcon from "@/components/common/icon/BoardLoadingIcon";
import BoardGridContainer from "@/components/common/ui/container/BoardGridContainer";
import { useGetBoardPosts } from "@/hooks/queries/useGetBoardPosts";
import { Post } from "@/types/post";
import useRefreshScrollReset from "@/utils/useRefreshScrollReset";

import BoardPhotoCard from "./card/BoardPhotoCard";

export default function BoardGrid() {
  const { data, fetchNextPage, isFetchingNextPage, isPending } =
    useGetBoardPosts();
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
                <BoardPhotoCard key={post._id} post={post} type="infinite" />
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
