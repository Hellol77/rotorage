import ModalTriggerButton from "@/components/common/button/ModalTriggerButton";
import CommentCard from "@/components/common/card/comment/CommentCard";
import MoreModal from "@/components/modalTemplate/moreModal/MoreModal";
import { Post } from "@/types/post";

export default function MobileCommentInfo({ post }: { post: Post }) {
  const { comments, commentsCount } = post;
  return (
    <>
      <div className="md:hidden ">
        <h4 className="px-4">댓글 {commentsCount}</h4>
        <section className="mb-2 flex h-20 flex-col overflow-scroll px-4">
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
    </>
  );
}
