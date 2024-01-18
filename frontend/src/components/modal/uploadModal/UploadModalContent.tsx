"use client";
import React, { ChangeEvent, DragEvent, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import PhotoAlbumIcon from "@/components/common/icon/PhotoAlbumIcon";
import { ModalTextAreaInput } from "@/components/common/modal/input/ModalTextAreaInput";
import { ModalEditContentContainer } from "@/components/common/modal/ModalContentContainer";
import { UserDataContext } from "@/contexts/AuthContext";
import { useModalTriggerButtonContext } from "@/contexts/ModalTriggerButton.context";
import { useUploadBoardPost } from "@/hooks/queries/useUploadBoardPost";
import Image from "next/image";

import useAuth from "@/hooks/useAuth";

export default function UploadModalContent() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const titleTextRef = useRef<HTMLInputElement>(null);
  const contentTextRef = useRef<HTMLInputElement>(null);
  const userData = useContext(UserDataContext);
  const { mutate } = useUploadBoardPost();
  const { validateLogin } = useAuth();
  const { handleCloseOnClick } = useModalTriggerButtonContext();
  const fileSizeCheck = (file: File) => {
    if (file.size > 1024 * 1024 * 10) {
      setFile(null);
      toast.warn("파일 사이즈는 10MB를 넘을 수 없습니다.");
    }
  };

  useEffect(() => {
    if (file) {
      fileSizeCheck(file);
    }
  }, [file]);

  const handleCloseEvent = () => {
    handleCloseOnClick();
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

  const handleSubmit = async () => {
    if (!(await validateLogin())) {
      return;
    }
    if (!file) return;
    if (!titleTextRef.current?.value) return;
    if (!contentTextRef.current?.value) return;
    const imageUrl = file;
    const title = titleTextRef.current?.value ?? "";
    const content = contentTextRef.current?.value ?? "";
    const userId = userData?.user.userId;
    const formData = { imageUrl, title, content, user: userId };
    mutate(formData);
    handleCloseEvent();
  };

  return (
    <ModalEditContentContainer
      submitText="등록하기"
      handleSubmit={handleSubmit}
      handleCloseOnClick={handleCloseOnClick}
      className="-top-20 left-0 right-0 p-4 "
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
        className={` flex h-[100vw]  w-[80vw] items-center justify-center hover:bg-slate-800 md:h-[36vw] md:w-[28vw] ${
          !file && "border-2 border-dashed border-sky-500"
        } `}
        htmlFor="input-upload"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {dragging && <div className="pointer-events-none absolute inset-0 z-10 bg-sky-500/20" />}
        {!file && (
          <div className="pointer-events-none flex flex-col items-center">
            <PhotoAlbumIcon color="#3e3e45" className="h-8 w-8" />
            <p className=" text-slate-300">Drag and Drop a image here or click</p>
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
      {/* <input
        placeholder="제목을 입력해주세요"
        className=" relative z-50 mb-1 mt-2 w-full px-4 font-poorStory text-2xl tracking-wider"
        name="title"
        id="input-text"
        ref={titleTextRef}
        required
      /> */}
      <ModalTextAreaInput
        className={`mt-2 w-full rounded-xl bg-[#27272a] px-2 py-2 `}
        placeholder="제목을 입력해주세요"
        name="title"
        id="input-text"
        ref={titleTextRef}
        required
      />
      <ModalTextAreaInput
        className={`mt-2 w-full rounded-xl bg-[#27272a] px-2 py-2 `}
        name="content"
        placeholder="내용을 입력해주세요"
        ref={contentTextRef}
        required
      />
    </ModalEditContentContainer>
  );
}
