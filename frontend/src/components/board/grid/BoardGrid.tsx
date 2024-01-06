"use client";
import React, { Fragment, useEffect, useRef } from "react";
import BoardPhotoCard from "./card/BoardPhotoCard";
import { useGetBoardPosts } from "@/hooks/queries/useGetBoardPosts";
import { Post } from "@/types/post";
import { useInView } from "framer-motion";
import BoardLoadingIcon from "@/components/common/icon/BoardLoadingIcon";
import BoardGridContainer from "../../common/ui/container/BoardGridContainer";
import Loading from "@/app/board/loading";

export default function BoardGrid() {
  const { data, fetchNextPage, isFetchingNextPage, isPending } =
    useGetBoardPosts();
  const ref = useRef(null);
  const isInView = useInView(ref);
  useEffect(() => {
    if (isInView && !isPending) {
      fetchNextPage();
    }
  }, [fetchNextPage, isInView, data]);

  return (
    <>
      {isPending ? (
        <Loading />
      ) : (
        <BoardGridContainer>
          {data?.pages?.map(({ pages, pageParams }) => (
            <Fragment key={pageParams || 0}>
              {pages.map((post: Post) => (
                <BoardPhotoCard key={post._id} post={post} />
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
