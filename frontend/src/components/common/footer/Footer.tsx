"use client";
import React from "react";

import GithubIcon from "@/components/common/icon/GithubIcon";
import HomeIcon from "@/components/common/icon/HomeIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer className={`mt-40 ${pathname === "/video/" && "hidden"}`}>
      <div className="flex flex-col items-center justify-center gap-1 p-4 text-sm text-gray-500">
        <div className=" flex w-full justify-center gap-4">
          <p>개발자: 헬롤 (Hellol)</p>
          <Link href={"https://github.com/Hellol77"} target="_blank">
            <GithubIcon />
          </Link>
        </div>
        <Link href={"mailto:dhe7700@naver.com"} className=" cursor-auto  hover:text-gray-700">
          버그 신고 및 문의 : dhe7700@naver.com
        </Link>
        <p>수익을 창출하지 않는 팬 페이지 입니다.</p>
      </div>
    </footer>
  );
}
