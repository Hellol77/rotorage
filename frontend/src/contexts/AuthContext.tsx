import React, {
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { refreshKakaoAccessToken } from "@/apis/auth";
import { usePathname } from "next/navigation";
import { UserData } from "@/types/user";

export const initailState: UserData = {
  user: {
    id: 0,
    nickname: "",
  },
  accessToken: "",
};

export const isLoginContext = createContext<boolean>(false);
export const UserDataContext = createContext<UserData | null>(initailState);
export const SetUserDataContext = createContext<React.Dispatch<
  React.SetStateAction<UserData | null>
> | null>(null);
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const pathname = usePathname();
  const checkLoginStatus = () => {
    return userData && !!userData.accessToken ? true : false;
  };
  const [isLogin, setLogin] = useState<boolean>(checkLoginStatus());

  useEffect(() => {
    if (pathname !== "/login/auth") {
      refreshKakaoAccessToken()
        .then((data) => {
          console.log(data.data);
          setUserData(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasToken = useMemo(() => !!userData?.accessToken, [userData]);

  useEffect(() => {
    setLogin(checkLoginStatus());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasToken]);
  return (
    <isLoginContext.Provider value={isLogin}>
      <UserDataContext.Provider value={userData}>
        <SetUserDataContext.Provider value={setUserData}>
          {children}
        </SetUserDataContext.Provider>
      </UserDataContext.Provider>
    </isLoginContext.Provider>
  );
}
