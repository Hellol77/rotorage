import React from "react";

import ProfileEditModalContent from "@/components/board/modal/profileModal/ProfileEditModalContent";
import ModalContainer from "@/components/common/modal/ModalContainer";
import { useModalTriggerButtonContext } from "@/contexts/ModalTriggerButton.context";

export default function ProfileEditModal() {
  const { onClick } = useModalTriggerButtonContext();
  return (
    <ModalContainer onClick={onClick}>
      <ProfileEditModalContent />
    </ModalContainer>
  );
}
