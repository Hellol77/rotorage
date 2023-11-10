"use client";
import React, { Fragment, useEffect, useRef } from "react";
import BoardPhotoCard from "./BoardPhotoCard";
import { useGetBoardPosts } from "@/hooks/queries/boardPosts";
import { Post } from "@/model/post";
import { useInView } from "framer-motion";
import BoardLoadingIcon from "@/app/icon/BoardLoadingIcon";

export default function BoardGrid() {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetBoardPosts();
  const ref = useRef(null);
  const isInView = useInView(ref);
  useEffect(() => {
    if (isInView) {
      fetchNextPage();
    }
    console.log(data);
  }, [fetchNextPage, isInView, data]);
  return (
    <>
      <div className="grid w-full grid-cols-2 gap-5  md:grid-cols-4 md:gap-4">
        {data?.pages?.map(
          ({
            data,
            pageParam,
          }: {
            data: Post[];
            pageParam: number | undefined;
          }) => (
            <Fragment key={pageParam || 0}>
              {data.map(({ title, content, imageUrl }) => (
                <BoardPhotoCard
                  key={imageUrl}
                  title={title}
                  content={content}
                  imageUrl={imageUrl}
                />
              ))}
            </Fragment>
          ),
        )}
      </div>
      <div ref={ref} className="my-12 flex h-4 w-full justify-center">
        <div className="h-8 w-8 text-black">
          {!isFetchingNextPage ? <BoardLoadingIcon /> : ""}
        </div>
      </div>
    </>
  );
}
