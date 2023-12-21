"use context";
import { getProfileInfo } from "@/apis/user";
import { UserDataContext } from "@/contexts/AuthContext";
import { useContext, useEffect } from "react";

export default async function useGetProfileData() {
  const userData = useContext(UserDataContext);
  useEffect(() => {
    const getData = async () => {
      const data = await getProfileInfo(userData.accessToken);
      console.log(data);
      return data;
    };
    getData();
  }, [userData]);
}
