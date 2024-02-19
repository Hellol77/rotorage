import { useContext } from "react";
import { toast } from "react-toastify";

import { deleteUser } from "@/apis/user";
import { LogoutContext, UserDataContext } from "@/contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useDeleteUser = () => {
  const { accessToken } = useContext(UserDataContext);
  const handleLogout = useContext(LogoutContext);
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: () => deleteUser(accessToken),
    onError: () => {
      toast.error("회원탈퇴에 실패했습니다.");
    },
    onSuccess: () => {
      router.replace("/");
      handleLogout();
      toast.success("탈퇴가 완료되었습니다.");
    },
  });

  return { deleteUser: mutate };
};
