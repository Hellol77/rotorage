import React, { RefObject } from "react";

export default function useGetFormData({
  textRef,
  contentRef,
  file,
}: {
  textRef: RefObject<HTMLInputElement>;
  contentRef: RefObject<HTMLInputElement>;
  file: File;
}) {
  const formData = new FormData();
  formData.append("imgFile", file);
  const value = [
    {
      title: textRef.current,
      content: contentRef.current,
    },
  ];
  const blob = new Blob([JSON.stringify(value)], { type: "application/json" });
}
