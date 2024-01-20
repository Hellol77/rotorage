import React from "react";

import ProfileAvatar from "@/components/common/avatar/ProfileAvatar";
import PencilIcon from "@/components/common/icon/PencilIcon";
import ModalTextInput from "@/components/common/modal/input/ModalTextInput";
import { ModalEditContentContainer } from "@/components/common/modal/ModalContentContainer";
import Divider from "@/components/common/ui/Divider";
import { IntroduceMaxLimitByte, NicknameMaxLimitByte } from "@/constants/stringLimit";

import useProfileEdit from "@/hooks/useProfileEdit";

export default function ProfileEditModalContent() {
  const {
    disabled,
    handleSubmit,
    handleCloseOnClick,
    nicknameInputByteCount,
    handleNicknameInput,
    nickname,
    profileImage,
    handleProfileImageInput,
    validateNickname,
    introduce,
    handleIntroduceInput,
    introduceInputByteCount,
    validateIntroduce,
  } = useProfileEdit();
  console.log("profileImage", profileImage);
  return (
    <ModalEditContentContainer
      submitText="수정하기"
      handleSubmit={handleSubmit}
      handleCloseOnClick={handleCloseOnClick}
      className="left-0 right-0 top-20"
      disabled={disabled}
    >
      <strong className=" p-4 font-Pretendard-Regular text-lg">프로필 편집</strong>
      <Divider className="mb-10 h-[1px] w-full" />
      <label className={` relative`} htmlFor="input-upload">
        <PencilIcon
          size="24"
          className="absolute bottom-5 right-3 z-50 translate-x-1/2 translate-y-1/2 transform cursor-pointer "
          onClick={() => {
            console.log("erer");
          }}
        />
        <ProfileAvatar size="large" profileImage={profileImage} />
        <input
          accept="image/gif, image/jpeg, image/png"
          name="imgFile"
          type="file"
          id="input-upload"
          required
          className="relative z-50 hidden h-[100vw] w-[80vw] rounded-md object-cover md:h-[40vw] md:w-[30vw]"
          onChange={handleProfileImageInput}
        />
      </label>
      <div className=" ">
        <div className=" mt-6">
          <div className="flex justify-between text-sm">
            <strong className=" ">닉네임</strong>
            <span>{`${nicknameInputByteCount}/${NicknameMaxLimitByte}`}</span>
          </div>
          <ModalTextInput onChange={handleNicknameInput} defaultValue={nickname} />
          <div className="mt-2 px-3 font-Pretendard-Regular text-xs text-red-500">
            {validateNickname}
          </div>
        </div>
        <div className="mt-8">
          <div className="flex justify-between text-sm">
            <strong className=" ">한 줄 자기소개</strong>
            <span>{`${introduceInputByteCount}/${IntroduceMaxLimitByte}`}</span>
          </div>
          <ModalTextInput
            placeholder="자기소개를 입력해주세요."
            defaultValue={introduce}
            onChange={handleIntroduceInput}
          />
          <div className="mt-2 px-3 font-Pretendard-Regular text-xs text-red-500">
            {validateIntroduce}
          </div>
        </div>
      </div>
    </ModalEditContentContainer>
  );
}
