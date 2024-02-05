import { ChangeEvent, DragEvent, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { AxiosResponse } from "axios";

import PhotoAlbumIcon from "@/components/common/icon/PhotoAlbumIcon";
import { ModalTextAreaInput } from "@/components/common/modal/input/ModalTextAreaInput";
import ModalContainer from "@/components/common/modal/ModalContainer";
import { ModalEditContentContainer } from "@/components/common/modal/ModalContentContainer";
import { UserDataContext } from "@/contexts/AuthContext";
import { useModalTriggerButtonContext } from "@/contexts/ModalTriggerButton.context";
import { Post, UpdatedPost } from "@/types/post";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import Image from "next/image";

import useAuth from "@/hooks/useAuth";

export default function UploadModal({
  beforePost,
  handleMoreModalClose,
  submitMutate,
}: {
  beforePost?: Post;
  handleMoreModalClose?: () => void;
  submitMutate: UseMutateAsyncFunction<AxiosResponse, unknown, UpdatedPost, unknown>;
}) {
  const {
    title,
    content,
    imageUrl: image,
  } = beforePost ?? { title: "", content: "", imageUrl: "" };
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const titleTextRef = useRef<HTMLTextAreaElement>(null);
  const contentTextRef = useRef<HTMLTextAreaElement>(null);
  const { validateLogin } = useAuth();
  const { handleCloseOnClick } = useModalTriggerButtonContext();
  const { onClick } = useModalTriggerButtonContext();
  useEffect(() => {
    if (titleTextRef.current) {
      titleTextRef.current.value = title;
    }
    if (contentTextRef.current) {
      contentTextRef.current.value = content;
    }
  }, [content, title]);
  const fileSizeCheck = (file: File) => {
    if (file.size > 1024 * 1024 * 5) {
      setFile(null);
      toast.warn("이미지 사이즈는 5MB를 넘을 수 없습니다.");
    }
  };

  useEffect(() => {
    if (file) {
      fileSizeCheck(file);
    }
  }, [file]);

  const handleCloseEvent = () => {
    if (handleMoreModalClose) {
      handleMoreModalClose();
    }
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
    console.log("fefwef");
    if (!(await validateLogin())) {
      return;
    }
    if (!file && !image) {
      toast.warn("파일을 업로드 해주세요.");
      return;
    }
    if (!titleTextRef.current?.value) {
      toast.warn("제목을 입력해주세요.");
      return;
    }
    handleCloseEvent();
    const imageUrl = file || image;
    const title = titleTextRef.current?.value ?? "";
    const content = contentTextRef.current?.value ?? "";
    const formData = { imageUrl, title, content };

    submitMutate(formData);
    return;

    // edit post
  };
  return (
    <ModalContainer onClick={onClick}>
      <ModalEditContentContainer
        submitText={image ? "수정" : "업로드"}
        handleSubmit={handleSubmit}
        handleCloseOnClick={handleCloseEvent}
        className="absolute   left-0 right-0 top-10 z-[100] p-4"
      >
        <input
          accept="image/*"
          name="imgFile"
          type="file"
          id="input-upload"
          required
          disabled={!!image}
          className="relative z-50 hidden h-[100vw] w-[80vw] rounded-md object-cover md:h-96 md:w-80"
          onChange={handleChange}
        />
        <label
          className={` flex h-[100vw]  w-[80vw] items-center justify-center  md:h-96 md:w-80 ${
            !file && !image && "border-2 border-dashed border-sky-500 hover:bg-slate-800"
          } `}
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && <div className="pointer-events-none absolute inset-0 z-10 bg-sky-500/20" />}
          {!file && !image && (
            <div className="pointer-events-none flex flex-col items-center">
              <PhotoAlbumIcon color="#3e3e45" className="h-8 w-8" />
              <p className=" text-slate-300">Drag and Drop a image here or click</p>
            </div>
          )}
          {file && !image && (
            <div className="border-slate-[#27272a] relative h-full w-full border-2">
              <Image
                className="h-full w-full object-cover"
                src={URL.createObjectURL(file)}
                alt="local file"
                fill
              />
            </div>
          )}
          {image && (
            <div className="border-slate-[#27272a] relative h-full w-full border-2">
              <Image className="h-full w-full object-cover" src={image} alt="local file" fill />
            </div>
          )}
        </label>
        <ModalTextAreaInput
          className={`mt-2 w-80 resize-none rounded-xl bg-[#27272a] px-2 py-2 `}
          placeholder="제목을 입력해주세요"
          name="title"
          rows={1}
          id="input-text"
          ref={titleTextRef}
          required
        />
        <ModalTextAreaInput
          className={`mt-2  w-80 rounded-xl bg-[#27272a] px-2 py-2 `}
          name="content"
          rows={2}
          placeholder="내용을 입력해주세요"
          ref={contentTextRef}
        />
      </ModalEditContentContainer>{" "}
    </ModalContainer>
  );
}
