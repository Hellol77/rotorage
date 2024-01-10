import { useContext } from "react";
import { toast } from "react-toastify";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { editProfile, getProfileInfo } from "@/apis/user";
import { LogoutContext, SetUserDataContext } from "@/contexts/AuthContext";
import { UserEditProfileType } from "@/types/user";

export default function useEditProfile({
  nickname,
  introduce,
  accessToken,
  handleCloseOnClick,
}: UserEditProfileType & { handleCloseOnClick: () => void }) {
  const handleLogout = useContext(LogoutContext);
  const setUserData = useContext(SetUserDataContext);
  return useMutation({
    mutationFn: () => editProfile({ nickname, introduce, accessToken }),
    onMutate: () => {
      if (!setUserData) return;
      setUserData((prev) => {
        return { ...prev, user: { ...prev.user, nickname, introduce } };
      });
    },
    onError: async (err: AxiosError) => {
      const userData = await getProfileInfo(accessToken);
      if (!setUserData) return;
      setUserData((prev) => ({ ...prev, user: userData }));
      if (err.request.status === 401) {
        handleLogout();
        toast.error("로그인이 만료되었습니다.");
        return;
      }
      if (err.request.status === 409) {
        toast.warn("이미 존재하는 닉네임입니다.");
        return;
      }
      console.log(err);
      toast.error("수정에 실패했습니다.");
      return;
    },
    onSuccess: async () => {
      toast.success("프로필이 수정되었습니다.");
      handleCloseOnClick();
    },
  });
}
