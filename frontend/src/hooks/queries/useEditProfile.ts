import { useContext } from "react";
import { toast } from "react-toastify";

import { AxiosError } from "axios";

import { editProfile, getMyProfileInfo } from "@/apis/user";
import { LogoutContext, SetUserDataContext } from "@/contexts/AuthContext";
import { UserEditProfileType } from "@/types/user";
import { useMutation } from "@tanstack/react-query";

export default function useEditProfile({
  handleCloseOnClick,
  accessToken,
}: {
  handleCloseOnClick: () => void;
  accessToken: string;
}) {
  const handleLogout = useContext(LogoutContext);
  const setUserData = useContext(SetUserDataContext);
  return useMutation({
    mutationFn: ({ nickname, introduce, accessToken, profileImage }: UserEditProfileType) =>
      editProfile({ nickname, introduce, profileImage, accessToken }),
    onMutate: ({ nickname, introduce, profileImage }) => {
      if (!setUserData) return;
      setUserData((prev) => {
        const { user } = prev;
        return {
          ...prev,
          user: {
            ...user,
            nickname,
            introduce,
            profileImage:
              profileImage instanceof File ? URL.createObjectURL(profileImage) : user.profileImage,
          },
        };
      });
    },
    onError: async (err: AxiosError) => {
      const userData = await getMyProfileInfo(accessToken);
      console.log(userData);
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
