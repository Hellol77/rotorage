import React from "react";

import ProfileAvatar from "@/components/common/avatar/ProfileAvatar";
import CommentCard from "@/components/common/card/comment/CommentCard";
import ModalContainer from "@/components/common/modal/ModalContainer";
import Divider from "@/components/common/ui/Divider";
import PhotoInfo from "@/components/modal/photoModal/info/PhotoInfo";
import WriterInfo from "@/components/modal/photoModal/info/WriterInfo";
import { Post } from "@/types/post";
import { motion } from "framer-motion";

export default function PhotoModal({
  handleModalClose,
  onClick,
  post,
  queryKey,
  ...props
}: {
  post: Post;
  onClick: boolean;
  handleModalClose: () => void;
  queryKey: string[];
}) {
  //TODO PhotoInfo 높이를 구해서 article의 높이를 정해줘야함
  const { _id, user, createdAt, imageUrl, title, content } = post;
  return (
    <ModalContainer handleModalClose={handleModalClose} onClick={onClick}>
      <motion.article
        key={_id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, zIndex: 60 }}
        exit={{ opacity: 0 }}
        layoutId={_id + queryKey}
        className="fixed left-0 right-0 top-5 z-50 mx-auto flex  w-fit flex-col rounded-lg bg-black  md:h-[800px] md:w-fit  md:min-w-[600px]   md:max-w-[1180px]"
      >
        <div className="   h-full w-full flex-col md:flex md:flex-row">
          <div className="order-1 h-full overflow-hidden md:order-2  md:w-[420px]">
            <WriterInfo user={user} createdAt={createdAt} handleModalClose={handleModalClose} />
            <Divider className="h-[1px] w-full" />
            <form className="z-20 hidden flex-shrink-0 flex-col overflow-hidden md:flex">
              <div className="z-20 h-[700px]  overflow-y-auto overflow-x-hidden p-3 px-5 font-poorStory scrollbar-hide ">
                <CommentCard
                  commentUserNickname="나는나는"
                  commentContent="ㄴㄴㄴㅇㄴㅇㅈㅂㅁㅇㅂ"
                  commentCreatedAt={new Date()}
                />
              </div>
              <input type="text" className="w-full" />
            </form>
          </div>
          <PhotoInfo title={title} imageUrl={imageUrl} content={content} />
        </div>
      </motion.article>
    </ModalContainer>
  );
}
