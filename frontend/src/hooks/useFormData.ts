import { RefObject } from "react";

export default function useGetFormData(
  textRef: RefObject<HTMLInputElement>,
  contentRef: RefObject<HTMLInputElement>,
  file: File | null,
) {
  if (file === null) return;
  const formData = new FormData();
  formData.append("imgFile", file);
  const value = [
    {
      title: textRef.current,
      content: contentRef.current,
    },
  ];
  const blob = new Blob([JSON.stringify(value)], { type: "application/json" });
  formData.append("post", blob);

  console.log(formData);
  return formData;
}
