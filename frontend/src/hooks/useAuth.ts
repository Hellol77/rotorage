import { AuthContext } from "@/contexts/AuthContext";
import React, { useContext } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export default function useAuth() {
  const searchParams = useSearchParams();
  const search = searchParams.get("code");
  const router = useRouter();
  const { updateAccessToken } = useContext(AuthContext);
  const login = async () => {
    if (search === null) {
      alert("유효하지 않은 로그인 코드입니다.");
      return;
    }
    await axios
      .get(`/api/auth/login/kakao?code=${search}`)
      .then(async (data) => {
        updateAccessToken(data.data.access_token);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return { login };
}
