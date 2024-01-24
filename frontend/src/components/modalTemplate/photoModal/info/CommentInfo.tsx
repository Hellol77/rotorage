import { KeyboardEventHandler, useRef } from "react";

import ModalTriggerButton from "@/components/common/button/ModalTriggerButton";
import CommentCard from "@/components/common/card/comment/CommentCard";
import BoardLoadingIcon from "@/components/common/icon/BoardLoadingIcon";
import { ModalTextAreaInput } from "@/components/common/modal/input/ModalTextAreaInput";
import MoreModal from "@/components/modalTemplate/moreModal/MoreModal";
import useAddComment from "@/hooks/queries/useAddComment";
import useDeletePost from "@/hooks/queries/useDeletePost";
import { Comment } from "@/types/post";

export default function CommentInfo({
  postId,
  comments,
  queryKey,
}: {
  postId: string;
  comments: Comment[];
  queryKey: string[];
}) {
  const commentContent = useRef<HTMLTextAreaElement>(null);
  const { mutateAsync, isPending } = useAddComment(postId, queryKey);
  const { mutate } = useDeletePost();
  const handleTextArea: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    const content = commentContent.current?.value ?? "";
    if (e.key === "Enter" && content.trim() !== "") {
      e.preventDefault();
      commentContent.current!.value = "";
      mutateAsync({ content });
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
    <form className="z-20 hidden flex-shrink-0 flex-col overflow-hidden  md:flex">
      <div className="z-20 h-[610px] overflow-y-auto overflow-x-hidden  pl-5 font-poorStory scrollbar-hide ">
        {comments.map(({ user, content, createdAt, _id: commentId }) => (
          <CommentCard
            key={commentId}
            commentProfileImage={user.profileImage}
            commentUserNickname={user.nickname}
            commentContent={content}
            commentCreatedAt={createdAt}
          >
            <ModalTriggerButton loginRequired content="more">
              <MoreModal type="comment" targetId={commentId} targetUser={user} />
            </ModalTriggerButton>
          </CommentCard>
        ))}
      </div>
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
    </form>
  );
}
