"use client";
import React from "react";
import kakao from "/public/kakao-Login.png";
import LoginButton from "@/components/common/ui/LoginButton";

export default function LoginPage() {
  return (
    <main className="flex h-screen w-screen justify-center overflow-x-hidden px-6 scrollbar-hide">
      <section className="mt-40 flex w-96 flex-col items-center">
        <h1 className="font-Pretendard-SemiBold md:w-50 mb-8 flex w-full justify-start text-2xl ">
          로그인시 이미지 업로드와<br></br>
          이미지 저장이 가능합니다.
        </h1>
        <div className="relative mb-16 w-full border-1 md:w-full " />
        <LoginButton title="kakao" image={kakao} onClick={() => {}} />
      </section>
    </main>
  );
}
