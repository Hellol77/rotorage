"use client";

import React, { createContext, ReactNode, useEffect, useMemo, useState } from "react";

import { refreshAccessTokenApi } from "@/apis/auth";
import { ACCESS_TOKEN_LOGOUT_STATE } from "@/constants/user";
import { ClientData } from "@/types/user";
import { usePathname } from "next/navigation";

export const initailState: ClientData = {
  user: {
    userId: "",
    nickname: "",
    introduce: "loading",
  },
  accessToken: ACCESS_TOKEN_LOGOUT_STATE[0],
};

export const logoutState: ClientData = {
  user: {
    userId: "",
    nickname: "",
    introduce: "",
  },
  accessToken: ACCESS_TOKEN_LOGOUT_STATE[1],
};

const exceptPathname = ["/login/auth/kakao"];

export const IsLoginContext = createContext<boolean>(false);
export const UserDataContext = createContext<ClientData>(initailState);
export const SetUserDataContext = createContext<React.Dispatch<
  React.SetStateAction<ClientData>
> | null>(null);
export const LogoutContext = createContext<() => void>(() => {});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<ClientData>(initailState);
  const pathname = usePathname();
  const checkLoginStatus = () => {
    return userData && !ACCESS_TOKEN_LOGOUT_STATE.includes(userData?.accessToken) ? true : false;
  };
  const [isLogin, setLogin] = useState<boolean>(checkLoginStatus());
  const handleLogout = () => {
    setUserData(logoutState);
  };

  useEffect(() => {
    if (!exceptPathname.includes(pathname)) {
      refreshAccessTokenApi("kakao")
        .then((data) => {
          setUserData(data);
        })
        .catch((err) => {
          setUserData(logoutState);
          handleLogout();
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const hasToken = useMemo(
    () => (!ACCESS_TOKEN_LOGOUT_STATE.includes(userData?.accessToken) ? true : false),
    [userData],
  );

  useEffect(() => {
    setLogin(checkLoginStatus());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasToken]);
  return (
    <IsLoginContext.Provider value={isLogin}>
      <UserDataContext.Provider value={userData}>
        <SetUserDataContext.Provider value={setUserData}>
          <LogoutContext.Provider value={handleLogout}>{children}</LogoutContext.Provider>
        </SetUserDataContext.Provider>
      </UserDataContext.Provider>
    </IsLoginContext.Provider>
  );
}
