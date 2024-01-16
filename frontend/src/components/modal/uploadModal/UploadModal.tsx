"use client";
import React from "react";

import UploadModalContent from "@/components/modal/uploadModal/UploadModalContent";
import ModalContainer from "@/components/common/modal/ModalContainer";
import { useModalTriggerButtonContext } from "@/contexts/ModalTriggerButton.context";

export default function UploadModal() {
  const { onClick } = useModalTriggerButtonContext();
  return (
    <ModalContainer onClick={onClick}>
      <UploadModalContent />
    </ModalContainer>
  );
}
