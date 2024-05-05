import { useContext } from "react";
import { toast } from "react-toastify";

import { loginApi, logoutApi, refreshAccessTokenApi, validateAccessTokenApi } from "@/apis/auth";
import { ACCESS_TOKEN_LOGOUT_STATE } from "@/constants/user";
import {
  IsLoginContext,
  LogoutContext,
  SetUserDataContext,
  UserDataContext,
} from "@/contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

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
      router.replace("/");
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
      toast.error("로그인에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      router.replace("/");
    }
  };

  const logout = async () => {
    if (handleLogout && userData) {
      try {
        const accessToken = userData.accessToken;
        const { _id } = userData.user;

        if (accessToken && _id) {
          await logoutApi(accessToken, _id);
        }
      } catch (err) {
        console.log("Logout failed", err);
        toast.error("로그아웃에 실패했습니다.");
      } finally {
        handleLogout();
        toast("로그아웃 되었습니다.", {});
        queryClient.clear();
        router.replace("/");
      }
    }
  };

  // access token 갱신, 만약 유효하지 않거나 refresh token을 통해 재발급, refresh
  const validateLogin = async () => {
    if (!userData) {
      console.log("not userDAta");
      return false;
    }
    const accessToken = userData.accessToken;
    const { _id } = userData.user;

    if (ACCESS_TOKEN_LOGOUT_STATE.includes(userData?.accessToken)) {
      toast.warn("로그인이 필요합니다.");
      console.log("validateLogin");
      handleLogout();
      return false;
    }

    try {
      const tokenInfo = await validateAccessTokenApi(accessToken);

      if (tokenInfo.accessToken !== undefined && setUserData) {
        setUserData((prev) => (prev ? { ...prev, accessToken: tokenInfo.accessToken } : prev));
      }

      return _id === tokenInfo._id;
    } catch (err) {
      // access toke이 만료되었을 경우
      const userData = await refreshAccessTokenApi("kakao");
      /*

    모든 api를 react query로 관리 해야하나
    **/
      if (setUserData && userData.accessToken) {
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
