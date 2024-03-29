"use client";
import { Fragment } from "react";

import ModalTriggerButton from "@/components/common/button/ModalTriggerButton";
import CommentCard from "@/components/common/card/comment/CommentCard";
import MainContainer from "@/components/common/container/MainContainer";
import MoreModal from "@/components/modalTemplate/moreModal/MoreModal";
import useCheckAdmin from "@/hooks/queries/admin/useCheckAdmin";
import { useGetReportedComments } from "@/hooks/queries/admin/useGetReportedComments";
import { Comment } from "@/types/post";

export default function AdminCommentPage() {
  const { isError, isFetching: isCheckFetching, isSuccess } = useCheckAdmin();
  const { data, fetchNextPage, isFetchingNextPage, isPending } = useGetReportedComments();

  if (isCheckFetching) return <MainContainer>loading...</MainContainer>;
  if (isError) return <MainContainer>권한이 없습니다.</MainContainer>;
  if (isSuccess) {
    return (
      <MainContainer>
        <form className="z-20 hidden flex-shrink-0 flex-col overflow-hidden  md:flex">
          <div className="z-20 h-[610px] overflow-y-auto overflow-x-hidden  pl-5 font-poorStory scrollbar-hide ">
            {data?.pages.map(({ pages, pageParams }) => (
              <Fragment key={pageParams || 0}>
                {pages.map((comment: Comment) => (
                  <CommentCard
                    key={comment._id}
                    commentProfileImage={comment.user.profileImage}
                    commentUserNickname={comment.user.nickname}
                    commentContent={comment.content}
                    commentCreatedAt={comment.createdAt}
                  >
                    <ModalTriggerButton loginRequired content="more">
                      <MoreModal type="comment" targetId={comment._id} targetUser={comment.user} />
                    </ModalTriggerButton>
                  </CommentCard>
                ))}
              </Fragment>
            ))}
          </div>
        </form>
      </MainContainer>
    );
  }
}
