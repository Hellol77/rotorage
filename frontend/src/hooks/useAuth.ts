import { SetUserDataContext } from "@/contexts/AuthContext";
import React, { useContext } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export default function useAuth() {
  const searchParams = useSearchParams();
  const search = searchParams.get("code");
  const router = useRouter();
  const setUserData = useContext(SetUserDataContext);
  const login = async () => {
    if (search === null) {
      alert("유효하지 않은 로그인 코드입니다.");
      return;
    }
    await axios
      .get(`/api/auth/login/kakao?code=${search}`)
      .then(async (data) => {
        if (setUserData) {
          setUserData(data.data);
        }
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        // router.push('/') // 로그인 실패시 메인페이지로 이동
      });
  };
  return { login };
}
