import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import CloseIcon from "@/app/icon/CloseIcon";
import { Textarea } from "@nextui-org/react";

export default function UploadModal({
  onClick,
  setOnClick,
}: {
  onClick: boolean;
  setOnClick: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleOnClick = () => {
    setOnClick(false);
  };
  return (
    <>
      <AnimatePresence>
        {onClick && (
          <>
            <motion.div
              key={"bg"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={handleOnClick}
              className="fixed left-0 top-0 z-40 h-full w-screen bg-[#101010] opacity-70"
            ></motion.div>
            <motion.div
              key={"modal"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className=" absolute left-0 right-0 top-5 z-50  m-auto  flex h-fit  w-fit  flex-col  items-center  justify-center rounded-lg bg-black"
            >
              <div
                className=" absolute right-1 top-2 z-[60] flex h-10  w-10 items-center justify-center"
                onClick={handleOnClick}
              >
                <CloseIcon className=" stroke-white" />
              </div>
              <input
                accept="image/*"
                type="file"
                name="input"
                id="input-upload"
                required
                className="relative z-50 hidden h-[100vw] w-[80vw] rounded-md object-cover md:h-[40vw] md:w-[30vw]"
              />
              <label
                className={`flex h-[100vw] w-[80vw]  items-center justify-center md:h-[40vw] md:w-[30vw] `}
                htmlFor="input-upload"
                // onDragEnter={handleDrag}
                // onDragLeave={handleDrag}
                // onDragOver={handleDragOver}
                // onDrop={handleDrop}
              ></label>
              <Textarea
                placeholder="제목을 입력해주세요"
                className=" relative z-50 mt-4 w-full justify-end px-4 font-poorStory text-2xl tracking-wider"
              />
              <Textarea
                placeholder="내용을 입력해주세요"
                className=" relative z-50 w-[80vw] break-all px-4 pb-3 pt-2 font-poorStory tracking-wide md:w-[30vw]"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
