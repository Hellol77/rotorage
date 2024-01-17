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
        className="  fixed left-0 right-0 top-20 z-50 m-auto  flex h-fit w-fit   flex-col items-center  justify-center  overflow-hidden  rounded-lg  bg-black"
      >
        <div className="md:flex">
          {/* <div
            className="absolute right-1 top-2 z-[60] flex h-10 w-10  cursor-pointer flex-col items-center justify-center"
            onClick={handleModalClose}
          > */}
          <CloseIcon
            size="32"
            onClick={handleModalClose}
            className=" absolute right-1 top-2 z-[60] flex cursor-pointer   flex-col items-center justify-center md:hidden"
          />
          {/* <DotsHorizontalIcon size="32" /> */}
          {/* </div> */}
          <div>
            <div className="relative h-[100vw] w-[80vw] rounded-md md:h-[40vw] md:w-[30vw]">
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className=" relative z-50 mt-4 w-full justify-end px-4 font-poorStory text-2xl tracking-wider">
              {title}
            </div>
            <div className=" relative z-50 w-[80vw] break-all px-4 pb-6 pt-2 font-poorStory tracking-wide md:w-[30vw]">
              {content}
            </div>
          </div>
          <div className="flex px-2 md:flex-col">
            <div className="flex h-24 w-96 items-center  justify-between">
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
                {/* <CloseIcon size="24" onClick={handleModalClose} className=" stroke-white" /> */}
                <DotsHorizontalIcon size="32" />
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </>
  );
}
