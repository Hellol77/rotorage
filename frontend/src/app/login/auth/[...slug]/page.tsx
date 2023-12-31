"use client";
import React, { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import BoardLoadingIcon from "@/components/common/icon/BoardLoadingIcon";
import CenterContainer from "@/components/common/container/CenterContainer";

export default function AuthPage() {
  const { login } = useAuth();

  useEffect(() => {
    login();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CenterContainer>
      <div className="md:w-50 mb-8 flex w-full justify-center font-Pretendard-SemiBold text-2xl ">
        로그인을 진행하는 중입니다.
      </div>
      <div className="flex justify-center">
        <BoardLoadingIcon className="flex h-12 w-12 justify-center" />
      </div>
    </CenterContainer>
  );
}
