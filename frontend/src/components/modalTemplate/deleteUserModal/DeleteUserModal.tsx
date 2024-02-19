import ModalContainer from "@/components/common/modal/ModalContainer";
import { ModalContentContainer } from "@/components/common/modal/ModalContentContainer";
import { useModalTriggerButtonContext } from "@/contexts/ModalTriggerButton.context";
import { useDeleteUser } from "@/hooks/queries/useDeleteUser";

export default function DeleteUserModal() {
  const { onClick, handleCloseOnClick } = useModalTriggerButtonContext();
  const { deleteUser } = useDeleteUser();
  const handleSubmit = () => {
    handleCloseOnClick();
    deleteUser();
  };
  return (
    <ModalContainer onClick={onClick} handleModalClose={handleCloseOnClick}>
      <ModalContentContainer className=" text-md top-40 z-[60] h-fit w-[60%]  bg-[#262626] p-8 md:w-96">
        <h2 className="w-full font-Pretendard-SemiBold text-2xl">정말 탈퇴하시겠습니까?</h2>
        <p>탈퇴 시, 모든 정보가 삭제됩니다.</p>
        <section className="mt-4">
          <button
            onClick={handleCloseOnClick}
            className="mt-4 w-full  rounded-lg bg-gray-500 p-2 font-Pretendard-SemiBold text-lg hover:bg-gray-600"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="mt-4 w-full  rounded-lg bg-red-500 p-2 font-Pretendard-SemiBold text-lg hover:bg-red-600"
          >
            탈퇴
          </button>
        </section>
      </ModalContentContainer>
    </ModalContainer>
  );
}
