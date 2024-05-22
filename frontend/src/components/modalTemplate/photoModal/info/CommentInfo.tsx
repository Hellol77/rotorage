import { KeyboardEventHandler, useRef } from "react";

import ModalTriggerButton from "@/components/common/button/ModalTriggerButton";
import CommentCard from "@/components/common/card/comment/CommentCard";
import BoardLoadingIcon from "@/components/common/icon/BoardLoadingIcon";
import { ModalTextAreaInput } from "@/components/common/modal/input/ModalTextAreaInput";
import MoreModal from "@/components/modalTemplate/moreModal/MoreModal";
import CommentInput from "@/components/modalTemplate/photoModal/info/CommentInput";
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
      <CommentInput queryKey={queryKey} postId={postId} />
    </form>
  );
}
