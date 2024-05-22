import ModalTriggerButton from "@/components/common/button/ModalTriggerButton";
import CommentCard from "@/components/common/card/comment/CommentCard";
import MoreModal from "@/components/modalTemplate/moreModal/MoreModal";
import CommentInput from "@/components/modalTemplate/photoModal/info/CommentInput";
import { Comment } from "@/types/post";

export default function MobileCommentInfo({
  postId,
  comments,
  queryKey,
}: {
  postId: string;
  comments: Comment[];
  queryKey: string[];
}) {
  return (
    <>
      <div className="md:hidden ">
        <h4 className="px-4">댓글 {comments.length}</h4>
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
        <CommentInput queryKey={queryKey} postId={postId} />
      </div>
    </>
  );
}
