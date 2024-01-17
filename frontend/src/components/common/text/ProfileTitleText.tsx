import React from "react";

export default function ProfileTitleText({ text }: { text: string }) {
  return (
    <h1 className="md:w-50 mb-4 mt-4 flex w-full font-Pretendard-SemiBold  text-xl md:mt-0 ">
      {text}
    </h1>
  );
}
