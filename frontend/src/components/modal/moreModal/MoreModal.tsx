import React from "react";

import ModalContainer from "@/components/common/modal/ModalContainer";
import { ModalContentContainer } from "@/components/common/modal/ModalContentContainer";
import { useModalTriggerButtonContext } from "@/contexts/ModalTriggerButton.context";

export default function MoreModal() {
  const { onClick } = useModalTriggerButtonContext();
  return (
    <ModalContainer onClick={onClick}>
      <ModalContentContainer>qwdqwdqw</ModalContentContainer>
    </ModalContainer>
  );
}
