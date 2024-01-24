import React, { ChangeEvent } from "react";

import ModalContainer from "@/components/common/modal/ModalContainer";
import { ModalContentContainer } from "@/components/common/modal/ModalContentContainer";
import { useModalTriggerButtonContext } from "@/contexts/ModalTriggerButton.context";

export default function ProfileImageEditModal({
  handleProfileImageInput,
  handleProfileImageReset,
}: {
  handleProfileImageInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleProfileImageReset: () => void;
}) {
  const { onClick, handleCloseOnClick } = useModalTriggerButtonContext();
  const handleImageEditOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleProfileImageInput(e);
    handleCloseOnClick();
  };
  const handleResetOnClick = () => {
    handleCloseOnClick();
    handleProfileImageReset();
  };
  return (
    <ModalContainer onClick={onClick} handleModalClose={handleCloseOnClick}>
      <ModalContentContainer className=" text-md top-60 z-[60] h-fit w-[60%] justify-center bg-[#262626] text-center md:w-60">
        <label className=" border-gray-400hover:bg-[#383838] flex  h-12 w-full cursor-pointer items-center justify-center rounded-t-xl border-b-[1px] hover:bg-[#383838]">
          <input
            accept="image/gif, image/jpeg, image/png"
            name="imgFile"
            type="file"
            id="input-upload"
            required
            className="relative z-50 hidden h-[100vw] w-[80vw] rounded-md object-cover md:h-[40vw] md:w-[30vw]"
            onChange={handleImageEditOnChange}
          />
          수정
        </label>
        <button
          onClick={handleResetOnClick}
          className="cursor flex h-12 w-full items-center justify-center  rounded-b-xl border-gray-400  text-center hover:bg-[#383838]"
        >
          이미지 초기화
        </button>
      </ModalContentContainer>
    </ModalContainer>
  );
}
