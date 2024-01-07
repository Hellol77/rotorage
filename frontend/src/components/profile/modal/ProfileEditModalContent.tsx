import { ModalEditContentContainer } from "@/components/common/modal/ModalContentContainer";
import { UserDataContext } from "@/contexts/AuthContext";
import { useModalTriggerButtonContext } from "@/contexts/ModalTriggerButton.context";
import { Avatar, Divider, Input } from "@nextui-org/react";
import React, { useContext } from "react";

export default function ProfileEditModalContent() {
  const { handleCloseOnClick } = useModalTriggerButtonContext();
  const { user } = useContext(UserDataContext);
  const handleSubmit = () => {};
  return (
    <ModalEditContentContainer
      submitText="수정하기"
      handleSubmit={handleSubmit}
      handleCloseOnClick={handleCloseOnClick}
      className="left-0 right-0 top-10 md:-top-20  "
    >
      <strong className=" p-4 font-Pretendard-Regular text-lg">
        프로필 편집
      </strong>
      <Divider />
      <Avatar src="" className="mt-10 h-20 w-20 md:h-36 md:w-36" />
      <div className=" p-10">
        <div>
          <strong className=" text-sm">닉네임</strong>
          <Input className="mt-2 w-72" defaultValue={user.nickname} />
        </div>
        <div className="mt-8">
          <strong className=" text-sm">한 줄 자기소개</strong>
          <Input
            className="mt-2 w-72"
            placeholder="자기소개를 입력해주세요."
            defaultValue={user.introduce || ""}
          />
        </div>
      </div>
    </ModalEditContentContainer>
  );
}
