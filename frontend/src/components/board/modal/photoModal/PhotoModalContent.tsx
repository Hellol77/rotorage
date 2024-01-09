import React from "react";

import { motion } from "framer-motion";
import Image from "next/image";

import CloseIcon from "@/components/common/icon/CloseIcon";
import { Post } from "@/types/post";

export default function PhotoModalContent({
  handleModalClose,
  post,
}: {
  handleModalClose: () => void;
  post: Post;
}) {
  const { title, content, imageUrl, _id } = post;
  return (
    <>
      <motion.div
        key={_id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        layoutId={_id}
        className="  fixed left-0 right-0 top-20 z-50 m-auto  flex h-fit w-fit   flex-col items-center  justify-center  overflow-hidden  rounded-lg  bg-black"
      >
        <div
          className=" absolute right-1 top-2 z-[60] flex h-10  w-10 items-center justify-center"
          onClick={handleModalClose}
        >
          <CloseIcon className=" stroke-white" />
        </div>

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
      </motion.div>
    </>
  );
}
