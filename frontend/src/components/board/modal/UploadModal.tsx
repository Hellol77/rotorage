"use client";
import React, {
  ChangeEvent,
  DragEvent,
  FormEvent,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Textarea } from "@nextui-org/react";
import PhotoAlbumIcon from "@/app/icon/PhotoAlbumIcon";
import Image from "next/image";

import { useUploadBoardPost } from "@/hooks/queries/boardPosts";

export default function UploadModal({
  onClick,
  setOnClick = function (value: React.SetStateAction<boolean>): void {
    throw new Error("Function not implemented.");
  },
}: {
  onClick?: boolean;
  setOnClick?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const titleTextRef = useRef<HTMLInputElement>(null);
  const contentTextRef = useRef<HTMLInputElement>(null);
  const { mutate } = useUploadBoardPost();
  const handleCloseOnClick = () => {
    setOnClick(false);
    setFile(null);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };
  const handleDrag = (e: DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;
    if (!titleTextRef.current?.value) return;
    if (!contentTextRef.current?.value) return;
    const imageUrl = file;
    const title = titleTextRef.current?.value ?? "";
    const content = contentTextRef.current?.value ?? "";
    // const formData = new FormData();
    // formData.append("imgFile", file);
    // formData.append("title", titleTextRef.current?.value ?? "");
    // formData.append("content", contentTextRef.current?.value ?? "");

    // let value = [
    //   {
    //     title: JSON.stringify(titleTextRef.current?.value),
    //     content: JSON.stringify(contentTextRef.current),
    //   },
    // ];
    // const blob = new Blob([JSON.stringify(value)], {
    //   type: "application/json",
    // });
    // formData.append("post", blob);
    mutate({ imageUrl, title, content });
    handleCloseOnClick();
    // const formData = new FormData(e.currentTarget);
    // console.log(formData);
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
              onClick={handleCloseOnClick}
              className="fixed left-0 top-0 z-40 h-full w-screen bg-[#101010] opacity-70"
            ></motion.div>
            <motion.div
              key={"modal"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className=" absolute left-0 right-0 top-5 z-50  m-auto  flex h-fit  w-fit  flex-col  items-center  justify-center rounded-xl bg-black"
            >
              <input
                accept="image/*"
                name="imgFile"
                type="file"
                id="input-upload"
                required
                className="relative z-50 hidden h-[100vw] w-[80vw] rounded-md object-cover md:h-[40vw] md:w-[30vw]"
                onChange={handleChange}
              />
              <label
                className={`mx-4 mt-4 flex h-[100vw]  w-[80vw] items-center justify-center hover:bg-slate-800 md:h-[36vw] md:w-[28vw] ${
                  !file && "border-2 border-dashed border-sky-500"
                } `}
                htmlFor="input-upload"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {dragging && (
                  <div className="pointer-events-none absolute inset-0 z-10 bg-sky-500/20" />
                )}
                {!file && (
                  <div className="pointer-events-none flex flex-col items-center">
                    <PhotoAlbumIcon color="#3e3e45" className="h-8 w-8" />
                    <p className=" text-slate-300">
                      Drag and Drop a image here or click
                    </p>
                  </div>
                )}
                {file && (
                  <div className="border-slate-[#27272a] relative h-full w-full border-2">
                    <Image
                      className="h-full w-full object-cover"
                      src={URL.createObjectURL(file)}
                      alt="local file"
                      fill
                    />
                  </div>
                )}
              </label>
              <Textarea
                placeholder="제목을 입력해주세요"
                className=" relative z-50 mt-2 w-full px-4 font-poorStory text-2xl tracking-wider"
                name="title"
                id="input-text"
                ref={titleTextRef}
                required
              />
              <Textarea
                name="content"
                placeholder="내용을 입력해주세요"
                className=" relative z-50 mb-2  w-full break-all px-4 font-poorStory tracking-wide "
                ref={contentTextRef}
                required
              />
              <div className="mb-3 flex  w-full items-center justify-center gap-2 px-4 font-poorStory">
                <Button
                  onClick={handleCloseOnClick}
                  color="default"
                  size="md"
                  className="w-full"
                >
                  닫기
                </Button>
                <Button
                  onClick={handleSubmit}
                  color="primary"
                  size="md"
                  className="w-full"
                >
                  등록하기
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}