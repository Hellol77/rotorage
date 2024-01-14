import React from "react";

// import { Avatar, Divider, Input } from "@nextui-org/react";

import { ModalEditContentContainer } from "@/components/common/modal/ModalContentContainer";
import useProfileEdit from "@/hooks/useProfileEdit";
import ProfileAvatar from "@/components/common/avatar/ProfileAvatar";

export const NicknameMaxLimitByte = 30;
export const NicknameMinLimitByte = 3;
export const IntroduceMaxLimitByte = 60;

export default function ProfileEditModalContent() {
  const {
    disabled,
    handleSubmit,
    handleCloseOnClick,
    nicknameInputByteCount,
    handleNicknameInput,
    nickname,
    validateNickname,
    introduce,
    handleIntroduceInput,
    introduceInputByteCount,
    validateIntroduce,
  } = useProfileEdit();

  return (
    <ModalEditContentContainer
      submitText="수정하기"
      handleSubmit={handleSubmit}
      handleCloseOnClick={handleCloseOnClick}
      className="left-0 right-0 top-10 md:-top-20  "
      disabled={disabled}
    >
      <strong className=" p-4 font-Pretendard-Regular text-lg">
        프로필 편집
      </strong>
      {/* <Divider /> */}
      {/* <Avatar src="" className="mt-10 h-20 w-20 md:h-36 md:w-36" /> */}
      <ProfileAvatar />
      <div className=" p-10">
        <div>
          <div className="flex justify-between text-sm">
            <strong className=" ">닉네임</strong>
            <span>{`${nicknameInputByteCount}/${NicknameMaxLimitByte}`}</span>
          </div>
          <input
            className="mt-2 w-72"
            onChange={handleNicknameInput}
            defaultValue={nickname}
          />
          <div className="mt-2 px-3 font-Pretendard-Regular text-xs text-red-500">
            {validateNickname}
          </div>
        </div>
        <div className="mt-8">
          <div className="flex justify-between text-sm">
            <strong className=" ">한 줄 자기소개</strong>
            <span>{`${introduceInputByteCount}/${IntroduceMaxLimitByte}`}</span>
          </div>
          <input
            className="mt-2 w-72 "
            placeholder="자기소개를 입력해주세요."
            defaultValue={introduce || ""}
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
