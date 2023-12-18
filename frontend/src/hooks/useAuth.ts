"use client";

import { useContext } from "react";
import {
  LogoutContext,
  SetUserDataContext,
  UserDataContext,
} from "@/contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { loginApi, logoutApi } from "@/apis/auth";

export default function useAuth() {
  const searchParams = useSearchParams();
  const search = searchParams.get("code");
  const router = useRouter();
  const setUserData = useContext(SetUserDataContext);
  const userData = useContext(UserDataContext);
  const handleLogout = useContext(LogoutContext);
  const login = async () => {
    if (search === null) {
      alert("유효하지 않은 로그인 코드입니다.");
      return;
    }
    try {
      const userData = await loginApi(search);
      if (setUserData) {
        setUserData(userData);
      }
    } catch (err) {
      console.log("Login Failed", err);
    } finally {
      router.push("/"); // 로그인 실패시 메인페이지로 이동
    }
  };
  const logout = async () => {
    if (handleLogout) {
      try {
        const accessToken = userData?.accessToken;
        const id = userData?.user.userId;
        if (accessToken && id) {
          await logoutApi(accessToken, id);
        }
      } catch (err) {
        console.log("Logout failed", err);
      } finally {
        handleLogout();
      }
    }
  };
  return { login, logout };
}
