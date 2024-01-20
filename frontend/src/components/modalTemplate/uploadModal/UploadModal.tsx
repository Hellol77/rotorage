"use client";
import React from "react";

import ModalContainer from "@/components/common/modal/ModalContainer";
import UploadModalContent from "@/components/modalTemplate/uploadModal/UploadModalContent";
import { useModalTriggerButtonContext } from "@/contexts/ModalTriggerButton.context";

export default function UploadModal() {
  const { onClick } = useModalTriggerButtonContext();
  return (
    <ModalContainer onClick={onClick}>
      <UploadModalContent />
    </ModalContainer>
  );
}
