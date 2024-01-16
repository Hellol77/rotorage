import ModalContainer from "@/components/common/modal/ModalContainer";
import ProfileEditModalContent from "@/components/modal/profileModal/ProfileEditModalContent";
import { useModalTriggerButtonContext } from "@/contexts/ModalTriggerButton.context";

export default function ProfileEditModal() {
  const { onClick } = useModalTriggerButtonContext();
  return (
    <ModalContainer onClick={onClick}>
      <ProfileEditModalContent />
    </ModalContainer>
  );
}
