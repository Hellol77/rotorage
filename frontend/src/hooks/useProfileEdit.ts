import { ChangeEvent, useContext, useMemo, useState } from "react";

import {
  IntroduceMaxLimitByte,
  NicknameMaxLimitByte,
  NicknameMinLimitByte,
} from "@/components/profile/modal/ProfileEditModalContent";
import { UserDataContext } from "@/contexts/AuthContext";
import { useModalTriggerButtonContext } from "@/contexts/ModalTriggerButton.context";
import useAuth from "@/hooks/useAuth";
import {
  inputByteCountCalculate,
  validateStringNumEngKor,
} from "@/utils/input/inputByteCount";

import useEditProfile from "./queries/useEditProfile";

export default function useProfileEdit() {
  const { handleCloseOnClick } = useModalTriggerButtonContext();
  const { user, accessToken } = useContext(UserDataContext);
  const [nickname, setNickname] = useState(user?.nickname);
  const [introduce, setIntroduce] = useState(user?.introduce);
  const [nicknameInputByteCount, setNicknameInputByteCount] = useState(
    inputByteCountCalculate(user.nickname),
  );
  const [introduceInputByteCount, setIntroduceInputByteCount] = useState(
    inputByteCountCalculate(user.introduce),
  );
  const [nicknameWarning, setNicknameWarning] = useState(false);
  const [introduceWarning, setIntroduceWarning] = useState(false);
  const { validateLogin } = useAuth();
  const { mutate } = useEditProfile({ nickname, introduce, accessToken });
  const handleSubmit = async () => {
    if (disabled) return;
    if (!validateLogin) return;
    mutate();
    handleCloseOnClick();
  };
  const handleNicknameInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
    const count = inputByteCountCalculate(value);
    setNicknameInputByteCount(count);
  };
  const handleIntroduceInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIntroduce(value);
    const count = inputByteCountCalculate(value);
    setIntroduceInputByteCount(count);
  };
  const validateNickname = useMemo(() => {
    if (nicknameInputByteCount < NicknameMinLimitByte) {
      setNicknameWarning(true);
      return "닉네임은 3byte이상 입력해주세요.";
    }
    if (validateStringNumEngKor(nickname)) {
      setNicknameWarning(true);
      return "닉네임은 한글, 영문, 숫자만 입력 가능해요.";
    }
    if (nicknameInputByteCount > NicknameMaxLimitByte) {
      setNicknameWarning(true);
      return "닉네임은 30byte이상 초과할 수 없어요.";
    }
    setNicknameWarning(false);
    return "";
  }, [nickname, nicknameInputByteCount]);

  const validateIntroduce = useMemo(() => {
    if (validateStringNumEngKor(introduce)) {
      setIntroduceWarning(true);
      return "자기소개는 한글, 영문, 숫자만 입력 가능해요.";
    }
    if (introduceInputByteCount > IntroduceMaxLimitByte) {
      setIntroduceWarning(true);
      return "자기소개는 60byte이상 초과할 수 없어요.";
    }
    setIntroduceWarning(false);
    return "";
  }, [introduce, introduceInputByteCount]);

  const disabled = useMemo(
    () => nicknameWarning || introduceWarning,
    [nicknameWarning, introduceWarning],
  );
  return {
    disabled,
    handleSubmit,
    handleCloseOnClick,
    nickname,
    validateNickname,
    nicknameInputByteCount,
    handleNicknameInput,
    introduce,
    handleIntroduceInput,
    introduceInputByteCount,
    validateIntroduce,
  };
}
