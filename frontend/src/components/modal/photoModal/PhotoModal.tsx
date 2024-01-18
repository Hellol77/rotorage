import React from "react";

import ModalContainer from "@/components/common/modal/ModalContainer";
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
  const { _id, user, createdAt, imageUrl, title, content } = post;
  return (
    <ModalContainer handleModalClose={handleModalClose} onClick={onClick}>
      <motion.article
        key={_id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, zIndex: 60 }}
        exit={{ opacity: 0 }}
        layoutId={_id + queryKey}
        className="fixed left-0 right-0 top-5 z-50 mx-auto flex  w-fit flex-col rounded-lg bg-black  md:max-h-[800px] md:w-fit  md:min-w-[600px]   md:max-w-[1280px]"
      >
        <div className="   h-full w-full flex-col md:flex md:flex-row">
          {/* <WriterInfo
            isMobile={true}
            user={user}
            createdAt={createdAt}
            handleModalClose={handleModalClose}
          /> */}
          <div className="order-1 h-full overflow-y-auto md:order-2">
            <WriterInfo user={user} createdAt={createdAt} handleModalClose={handleModalClose} />
            <div className="hidden max-h-[600px] overflow-y-auto md:flex md:flex-col">
              <div>안녕하영</div>
            </div>
          </div>
          <PhotoInfo title={title} imageUrl={imageUrl} content={content} />
        </div>
      </motion.article>
    </ModalContainer>
  );
}
