import { ChangeEvent, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import {
  IntroduceMaxLimitByte,
  NicknameMaxLimitByte,
  NicknameMinLimitByte,
} from "@/constants/stringLimit";
import { UserDataContext } from "@/contexts/AuthContext";
import { useModalTriggerButtonContext } from "@/contexts/ModalTriggerButton.context";
import { inputByteCountCalculate, validateStringNumEngKor } from "@/utils/input/inputByteCount";

import useEditProfile from "./queries/useEditProfile";

export default function useProfileEdit() {
  const { handleCloseOnClick } = useModalTriggerButtonContext();
  const { user, accessToken } = useContext(UserDataContext);
  const [nickname, setNickname] = useState(user?.nickname);
  const [introduce, setIntroduce] = useState(user?.introduce);
  const [profileImage, setProfileImage] = useState<File | string>(user?.profileImage);
  const [nicknameInputByteCount, setNicknameInputByteCount] = useState(
    inputByteCountCalculate(user.nickname),
  );
  const [introduceInputByteCount, setIntroduceInputByteCount] = useState(
    inputByteCountCalculate(user.introduce),
  );
  const [nicknameWarning, setNicknameWarning] = useState(false);
  const [introduceWarning, setIntroduceWarning] = useState(false);
  const { mutate, failureReason } = useEditProfile({
    accessToken,
    handleCloseOnClick,
  });

  const fileSizeCheck = useCallback(
    (file: File | string) => {
      if (typeof file !== "string" && file.size > 1024 * 1024 * 5) {
        setProfileImage(user.profileImage);
        toast.warn("이미지 사이즈는 5MB를 넘을 수 없습니다.");
      }
    },
    [user.profileImage],
  );

  useEffect(() => {
    if (profileImage) {
      fileSizeCheck(profileImage);
    }
  }, [fileSizeCheck, profileImage]);

  const handleSubmit = async () => {
    if (disabled) return;
    mutate({ nickname, introduce, accessToken, profileImage });
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
  const handleProfileImageInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setProfileImage(files[0]);
    }
  };
  const handleProfileImageReset = () => {
    setProfileImage("");
  };
  const validateNickname = useMemo(() => {
    if (nicknameInputByteCount < NicknameMinLimitByte) {
      setNicknameWarning(true);
      return `닉네임은 ${NicknameMinLimitByte}byte이상 입력해주세요.`;
    }
    if (validateStringNumEngKor(nickname)) {
      setNicknameWarning(true);
      return "닉네임은 한글, 영문, 숫자만 입력 가능해요.";
    }
    if (nicknameInputByteCount > NicknameMaxLimitByte) {
      setNicknameWarning(true);
      return `닉네임은 ${NicknameMaxLimitByte}byte이상 초과할 수 없어요.`;
    }
    setNicknameWarning(false);
    return "";
  }, [nickname, nicknameInputByteCount]);

  const validateIntroduce = useMemo(() => {
    if (introduceInputByteCount > IntroduceMaxLimitByte) {
      setIntroduceWarning(true);
      return `자기소개는 ${IntroduceMaxLimitByte}byte이상 초과할 수 없어요.`;
    }
    setIntroduceWarning(false);
    return "";
  }, [introduceInputByteCount]);

  const disabled = useMemo(
    () =>
      (nickname === user.nickname &&
        introduce === user.introduce &&
        profileImage === user.profileImage) ||
      nicknameWarning ||
      introduceWarning,
    [
      user.nickname,
      user.introduce,
      user.profileImage,
      nickname,
      introduce,
      profileImage,
      nicknameWarning,
      introduceWarning,
    ],
  );
  return {
    disabled,
    handleSubmit,
    handleCloseOnClick,
    handleProfileImageInput,
    handleProfileImageReset,
    nickname,
    validateNickname,
    nicknameInputByteCount,
    handleNicknameInput,
    introduce,
    profileImage,
    handleIntroduceInput,
    introduceInputByteCount,
    validateIntroduce,
    failureReason,
  };
}
