import { KeyboardEventHandler, useRef } from "react";

import CommentCard from "@/components/common/card/comment/CommentCard";
import { ModalTextAreaInput } from "@/components/common/modal/input/ModalTextAreaInput";
import useAddComment from "@/hooks/queries/useAddComment";
import { Comment } from "@/types/post";

export default function CommentInfo({ postId, comments }: { postId: string; comments: Comment[] }) {
  const commentContent = useRef<HTMLTextAreaElement>(null);
  const { mutateAsync, isPending } = useAddComment(postId);

  const handleTextArea: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    const content = commentContent.current?.value ?? "";
    if (e.key === "Enter" && !e.shiftKey && content.trim() !== "") {
      e.preventDefault();
      mutateAsync({ content });
    }
  };
  return (
    <form className="z-20 hidden flex-shrink-0 flex-col overflow-hidden  md:flex">
      <div className="z-20 h-[600px] overflow-y-auto overflow-x-hidden  pl-5 font-poorStory scrollbar-hide ">
        {comments.map(({ user, content, createdAt, _id }) => (
          <CommentCard
            key={_id}
            commentProfileImage={user.profileImage}
            commentUserNickname={user.nickname}
            commentContent={content}
            commentCreatedAt={createdAt}
          >
            w
          </CommentCard>
        ))}
      </div>
      <div>
        <ModalTextAreaInput
          rows={3}
          className={`h-40 w-full resize-none  px-4  `}
          ref={commentContent}
          onKeyPress={handleTextArea}
          disabled={isPending}
        />
        <div>게시</div>
      </div>
    </form>
  );
}
