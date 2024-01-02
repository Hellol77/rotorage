"use client";
import React, { Fragment, useEffect, useRef } from "react";
import BoardPhotoCard from "./card/BoardPhotoCard";
import { useGetBoardPosts } from "@/hooks/queries/boardPosts";
import { Post } from "@/types/post";
import { useInView } from "framer-motion";
import BoardLoadingIcon from "@/components/common/icon/BoardLoadingIcon";
import BoardGridContainer from "../../common/ui/container/BoardGridContainer";

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
      <BoardGridContainer>
        {data?.pages?.map(({ pages, pageParams }) => (
          <Fragment key={pageParams || 0}>
            {pages.map((post: Post) => (
              <BoardPhotoCard key={post.imageUrl} post={post} />
            ))}
          </Fragment>
        ))}
      </BoardGridContainer>
      <div ref={ref} className="my-12 flex h-4 w-full justify-center">
        {isFetchingNextPage ? (
          <BoardLoadingIcon className="h-8 w-8 text-black" />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
