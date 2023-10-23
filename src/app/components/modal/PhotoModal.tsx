import React from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@/app/icon/CloseIcon";

export default function PhotoModal({
  image,
  title,
  content,
  id,
  setPhotoClicked,
  ...props
}: {
  image: StaticImageData;
  title: string;
  content: string;
  id: string;
  setPhotoClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handlePhotoClicked = () => {
    setPhotoClicked(false);
  };

  return (
    <>
      <motion.div
        onClick={handlePhotoClicked}
        className="fixed left-0 top-0 z-40 h-full w-screen bg-[#101010] opacity-70"
      ></motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={id}
          layoutId={id}
          initial={{ zIndex: 50 }}
          exit={{ zIndex: 100 }}
          className="absolute left-0 right-0 top-20  m-auto  flex h-fit  w-fit  flex-col  items-center  justify-center rounded-lg bg-black"
        >
          <div
            className=" absolute right-1 top-2 z-[60] flex h-10  w-10 items-center justify-center"
            onClick={handlePhotoClicked}
          >
            <CloseIcon onClick={handlePhotoClicked} className=" stroke-white" />
          </div>
          <Image
            src={image}
            alt={id}
            className="relative  z-50 h-[100vw] w-[80vw] rounded-md object-cover md:h-[40vw] md:w-[30vw]"
          />
          <div className=" relative z-50 mt-4 w-full justify-end px-4 font-poorStory text-2xl tracking-wider">
            {title}
          </div>
          <div className=" relative z-50 w-[80vw] break-all px-4 pb-6 pt-2 font-poorStory tracking-wide md:w-[30vw]">
            {content}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
