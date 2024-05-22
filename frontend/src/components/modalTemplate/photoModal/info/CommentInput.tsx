import { KeyboardEventHandler, useRef } from "react";

import BoardLoadingIcon from "@/components/common/icon/BoardLoadingIcon";
import { ModalTextAreaInput } from "@/components/common/modal/input/ModalTextAreaInput";
import useAddComment from "@/hooks/queries/useAddComment";

export default function CommentInput({ queryKey, postId }: { queryKey: string[]; postId: string }) {
  const commentContent = useRef<HTMLTextAreaElement>(null);
  const { mutateAsync, isPending } = useAddComment(postId, queryKey);
  const handleTextArea: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    const content = commentContent.current?.value ?? "";
    if (e.key === "Enter" && content.trim() !== "") {
      if (e.nativeEvent.isComposing === false) {
        e.preventDefault();
        commentContent.current!.value = "";
        mutateAsync({ content });
      }
    }
  };
  const handleOnClick = () => {
    const content = commentContent.current?.value ?? "";
    if (content.trim() !== "") {
      commentContent.current!.value = "";
      mutateAsync({ content });
    }
  };
  return (
    <div className="relavite flex h-24 items-center justify-center border-t-[1px] border-gray-800">
      <ModalTextAreaInput
        rows={3}
        className={`border-b-none h-full w-full resize-none rounded-none border-gray-800 bg-black  px-4 pt-2  `}
        ref={commentContent}
        onKeyDown={handleTextArea}
        disabled={isPending}
        placeholder="댓글 입력..."
      />
      <div
        className={`flex h-full w-14 items-center justify-center border-l-[1px] border-gray-800 hover:bg-[#161616] ${isPending && "text-gray-500"}`}
        onClick={handleOnClick}
      >
        입력
      </div>
      {isPending && <BoardLoadingIcon className="absolute h-10 w-10 " />}
    </div>
  );
}
