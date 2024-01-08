"use client";

import React, {
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { refreshAccessTokenApi } from "@/apis/auth";
import { usePathname } from "next/navigation";
import { ClientData } from "@/types/user";

export const initailState: ClientData = {
  user: {
    userId: "",
    nickname: "",
    introduce: "loading",
  },
  accessToken: "",
};

export const logoutState: ClientData = {
  user: {
    userId: "",
    nickname: "",
    introduce: "",
  },
  accessToken: "logout",
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
    return userData &&
      userData?.accessToken !== "logout" &&
      userData?.accessToken !== ""
      ? true
      : false;
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
          handleLogout();
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const hasToken = useMemo(
    () =>
      userData?.accessToken !== "logout" && userData?.accessToken !== ""
        ? true
        : false,
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
          <LogoutContext.Provider value={handleLogout}>
            {children}
          </LogoutContext.Provider>
        </SetUserDataContext.Provider>
      </UserDataContext.Provider>
    </IsLoginContext.Provider>
  );
}
