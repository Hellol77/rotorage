import React from "react";

import ProfileAvatar from "@/components/common/avatar/ProfileAvatar";
import CloseIcon from "@/components/common/icon/CloseIcon";
import DotsHorizontalIcon from "@/components/common/icon/DotsHorizontalIcon";
import { Post } from "@/types/post";
import { relativeDate } from "@/utils/relativeDate";
import { motion } from "framer-motion";
import Image from "next/image";

export default function PhotoModalContent({
  handleModalClose,
  post,
  queryKey,
}: {
  handleModalClose: () => void;
  post: Post;
  queryKey: string[];
}) {
  const { title, content, imageUrl, _id, createdAt, user } = post;
  return (
    <>
      <motion.article
        key={_id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        layoutId={_id + queryKey}
        className="  fixed left-0 right-0 top-20 z-50 mx-auto flex h-4/5 max-h-[1080px] w-4/5 max-w-[1440px]  flex-col items-center  justify-center   rounded-lg  bg-black  "
      >
        <div className="flex h-full w-full flex-col md:grid-cols-2 md:flex-row">
          <CloseIcon
            size="24"
            onClick={handleModalClose}
            className=" absolute right-1 top-2 z-[60] flex cursor-pointer   flex-col items-center justify-center md:hidden"
          />
          <div className="flex w-full px-2 md:hidden md:flex-col">
            <div className="flex h-24 w-full items-center  justify-between">
              <div className="flex">
                <ProfileAvatar size="medium" />
                <div className="flex flex-col  justify-center">
                  <span className="ml-2 font-poorStory text-2xl tracking-wide">
                    {user.nickname}
                  </span>
                  <time className="ml-2 font-poorStory text-xs tracking-wide">
                    {relativeDate(createdAt)}
                  </time>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start ">
                <DotsHorizontalIcon size="32" />
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex h-full w-full flex-col">
            <div className="relative h-full w-full rounded-md md:h-full md:w-full">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="h-full w-full object-cover md:object-contain"
              />
            </div>
            <div className=" z-50 mt-4 h-fit w-full justify-end px-4 font-poorStory text-2xl tracking-wider">
              {title}
            </div>
            <div className="z-50 h-fit break-all px-4 pb-6 pt-2 font-poorStory tracking-wide ">
              {content}
            </div>
          </div>
          {/*  */}
          <div className="hidden w-full px-4 md:flex md:flex-col">
            <div className="flex h-24  items-center  justify-between">
              <div className="flex">
                <ProfileAvatar size="medium" />
                <div className="flex flex-col  justify-center">
                  <span className="ml-2 font-poorStory text-2xl tracking-wide">
                    {user.nickname}
                  </span>
                  <time className="ml-2 font-poorStory text-xs tracking-wide">
                    {relativeDate(createdAt)}
                  </time>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start ">
                <DotsHorizontalIcon size="32" />
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </>
  );
}
