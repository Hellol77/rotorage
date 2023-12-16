import React, { ReactNode, createContext, useEffect, useState } from "react";
import { refreshKakaoAccessToken } from "@/apis/auth";
import { usePathname } from "next/navigation";

export const AuthContext = createContext({
  user: null,
  accessToken: "",
  updateAccessToken: (accessToken: string) => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const [accessToken, setAccessToken] = useState<string>("");
  const updateAccessToken = (accessToken: string) => {
    setAccessToken(accessToken);
  };
  useEffect(() => {
    if (pathname !== "/login/auth") {
      refreshKakaoAccessToken()
        .then((data) => {
          updateAccessToken(data.data.access_token);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, updateAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}
