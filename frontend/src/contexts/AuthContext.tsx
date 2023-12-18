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
import { UserData } from "@/types/user";

export const initailState: UserData = {
  user: {
    id: 0,
    nickname: "",
  },
  accessToken: "",
};

export const IsLoginContext = createContext<boolean>(false);
export const UserDataContext = createContext<UserData | null>(initailState);
export const SetUserDataContext = createContext<React.Dispatch<
  React.SetStateAction<UserData | null>
> | null>(null);
export const LogoutContext = createContext<(() => void) | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const pathname = usePathname();
  const checkLoginStatus = () => {
    return userData && !!userData.accessToken ? true : false;
  };
  const [isLogin, setLogin] = useState<boolean>(checkLoginStatus());

  useEffect(() => {
    if (pathname !== "/login/auth/kakao") {
      refreshAccessTokenApi("kakao")
        .then((data) => {
          console.log(data.data);
          setUserData(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  const handleLogout = () => {
    console.log("isLogin", isLogin);
    setUserData(null);
  };
  const hasToken = useMemo(
    () => (userData?.accessToken ? true : false),
    [userData],
  );

  useEffect(() => {
    setLogin(checkLoginStatus());
    console.log("checklogin", checkLoginStatus());
    console.log("hasToken", hasToken);
    console.log("userData", userData);
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
