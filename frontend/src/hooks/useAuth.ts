import { useContext } from "react";
import { toast } from "react-toastify";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import {
  loginApi,
  logoutApi,
  refreshAccessTokenApi,
  validateAccessTokenApi,
} from "@/apis/auth";
import {
  IsLoginContext,
  LogoutContext,
  SetUserDataContext,
  UserDataContext,
} from "@/contexts/AuthContext";

export default function useAuth() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const search = searchParams.get("code");
  const router = useRouter();
  const isLogin = useContext(IsLoginContext);
  const setUserData = useContext(SetUserDataContext);
  const userData = useContext(UserDataContext);
  const handleLogout = useContext(LogoutContext);

  const login = async () => {
    if (search === null) {
      toast.error("유효하지 않은 로그인 코드입니다.");
      return;
    }
    try {
      const userData = await loginApi(search);
      if (setUserData) {
        setUserData(userData);
      }
      queryClient.clear();
    } catch (err) {
      console.log("Login Failed", err);
      toast.error("로그인에 실패했습니다.");
    } finally {
      router.push("/");
    }
  };

  const logout = async () => {
    if (handleLogout && userData) {
      try {
        const accessToken = userData.accessToken;
        const { userId } = userData.user;

        if (accessToken && userId) {
          await logoutApi(accessToken, userId);
        }
      } catch (err) {
        console.log("Logout failed", err);
        toast.error("로그아웃에 실패했습니다.");
      } finally {
        handleLogout();
        toast("로그아웃 되었습니다.", {});
        queryClient.clear();
        router.push("/");
      }
    }
  };

  // access token 갱신, 만약 유효하지 않거나 refresh token을 통해 재발급, refresh
  const validateLogin = async () => {
    if (!userData) return false;

    const accessToken = userData.accessToken;
    const { userId } = userData.user;

    if (!userId || !accessToken) {
      toast.warn("로그인이 필요합니다.");
      handleLogout();
      return false;
    }

    try {
      const tokenInfo = await validateAccessTokenApi(accessToken);

      if (tokenInfo.accessToken !== undefined && setUserData) {
        setUserData((prev) =>
          prev ? { ...prev, accessToken: tokenInfo.accessToken } : prev,
        );
      }

      return userId === tokenInfo.userId;
    } catch (err) {
      // access toke이 만료되었을 경우
      const userData = await refreshAccessTokenApi("kakao");
      /*
    
    모든 api를 react query로 관리 해야하나
    **/
      if (setUserData && userData.accessToken) {
        console.log("401 refresh token");
        setUserData(userData);
        return true;
      }
      toast.warn("로그인이 필요합니다.");
      handleLogout();
      return false;
    }
  };

  return { isLogin, login, logout, validateLogin };
}
