import React, { useEffect, useRef } from "react";

import ModalTriggerButton from "@/components/common/button/ModalTriggerButton";
import CommentCard from "@/components/common/card/comment/CommentCard";
import ModalContainer from "@/components/common/modal/ModalContainer";
import Divider from "@/components/common/ui/Divider";
import MoreModal from "@/components/modalTemplate/moreModal/MoreModal";
import CommentInfo from "@/components/modalTemplate/photoModal/info/CommentInfo";
import PhotoInfo from "@/components/modalTemplate/photoModal/info/PhotoInfo";
import WriterInfo from "@/components/modalTemplate/photoModal/info/WriterInfo";
import { Post } from "@/types/post";
import { motion } from "framer-motion";

export default function PhotoModal({
  handleModalClose,
  onClick,
  post,
  queryKey,
}: {
  post: Post;
  onClick: boolean;
  handleModalClose: () => void;
  queryKey: string[];
}) {
  //TODO PhotoInfo 높이를 구해서 article의 높이를 정해줘야함
  const { _id, user, createdAt, imageUrl, title, content, comments, commentsCount } = post;

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleModalClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [handleModalClose]);
  return (
    <ModalContainer handleModalClose={handleModalClose} onClick={onClick}>
      <motion.article
        onClick={(e) => e.stopPropagation()}
        key={_id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, zIndex: 60 }}
        exit={{ opacity: 0 }}
        layoutId={_id + queryKey}
        className="fixed left-0 right-0 top-5 z-[110] mx-auto flex  w-fit flex-col rounded-lg bg-black  md:h-[800px] md:w-fit  md:min-w-[600px]   md:max-w-[1180px]"
      >
        <div className="   h-full w-full flex-col md:flex md:flex-row">
          <div className="order-1 h-full overflow-hidden md:order-2  md:w-[470px]">
            <WriterInfo
              post={post}
              user={user}
              createdAt={createdAt}
              handleModalClose={handleModalClose}
            />
            <Divider className="h-[1px] w-full" />
            <CommentInfo comments={comments} postId={_id} queryKey={queryKey} />
          </div>
          <PhotoInfo queryKey={queryKey} post={post} />
          <h4 className="px-4">댓글 {commentsCount}</h4>
          <section className="mb-2 flex h-20 flex-col overflow-scroll px-4 md:hidden">
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
          </section>
        </div>
      </motion.article>
    </ModalContainer>
  );
}
