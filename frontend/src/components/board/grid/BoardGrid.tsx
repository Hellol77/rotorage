"use client";
import React, { Fragment, Suspense, useEffect, useRef } from "react";
import BoardPhotoCard from "./BoardPhotoCard";
import { useGetBoardPosts } from "@/hooks/queries/boardPosts";
import { Post } from "@/types/post";
import { useInView } from "framer-motion";
import BoardLoadingIcon from "@/components/common/icon/BoardLoadingIcon";

export default function BoardGrid() {
  const { data, fetchNextPage, isFetchingNextPage } = useGetBoardPosts();
  const ref = useRef(null);
  const isInView = useInView(ref);
  useEffect(() => {
    if (isInView) {
      fetchNextPage();
      console.log("data", data);
    }
  }, [fetchNextPage, isInView, data]);
  return (
    <>
      <div className="grid w-full grid-cols-2 gap-5  md:grid-cols-4 md:gap-4">
        {data?.pages?.map(
          ({
            pages,
            pageParams,
          }: {
            pages: Post[];
            pageParams: number | undefined;
          }) => (
            <Fragment key={pageParams || 0}>
              {pages.map(({ title, content, imageUrl }) => (
                <Suspense key={imageUrl} fallback={<BoardLoadingIcon />}>
                  <BoardPhotoCard
                    title={title}
                    content={content}
                    imageUrl={imageUrl}
                  />
                </Suspense>
              ))}
            </Fragment>
          ),
        )}
      </div>
      <div ref={ref} className="my-12 flex h-4 w-full justify-center">
        <div className="h-8 w-8 text-black">
          {isFetchingNextPage ? <BoardLoadingIcon /> : ""}
        </div>
      </div>
    </>
  );
}
