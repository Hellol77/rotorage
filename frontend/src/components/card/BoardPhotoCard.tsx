"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import PhotoModal from "../modal/PhotoModal";

export default function BoardPhotoCard({
  imageUrl,
  title,
  content,
  id,
  ...props
}: {
  imageUrl: string;
  title: string;
  content: string;
  id: string;
}) {
  const [onPhotoClicked, setOnPhotoClicked] = useState(false);
  const handlePhotoClicked = () => setOnPhotoClicked(true);

  return (
    <>
      <AnimatePresence>
        {onPhotoClicked ? (
          <>
            <PhotoModal
              title={title}
              imageUrl={imageUrl}
              content={content}
              id={id}
              setPhotoClicked={setOnPhotoClicked}
            />
          </>
        ) : (
          ""
        )}
        <motion.div
          onClick={handlePhotoClicked}
          key={id}
          layoutId={id}
          transition={{ duration: 0.2 }}
          className="relative z-30 h-44 w-full md:h-[35vh] "
        >
          <div className="relative h-full w-full rounded-md">
            <Image
              src={imageUrl}
              alt={id}
              priority
              fill
              objectFit="cover"
              className="relative z-10 rounded-md object-cover"
            />
          </div>
          <div className="absolute top-0 z-10 flex h-full w-full flex-col justify-end bg-transparent bg-gradient-to-b from-transparent from-[40%] to-[#101010] px-2 py-2  md:px-4 md:py-4">
            <div className="text-md truncate font-poorStory font-bold tracking-wider md:mb-1 md:text-2xl">
              {title}
            </div>
            <div className=" flex-nowrap truncate font-poorStory  text-sm tracking-wide text-slate-200">
              {content}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
