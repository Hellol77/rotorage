import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

import LikeButton from "@/components/common/button/LikeButton";
import ModalTriggerButton from "@/components/common/button/ModalTriggerButton";
import CommentIcon from "@/components/common/icon/CommentIcon";
import MoreModal from "@/components/modalTemplate/moreModal/MoreModal";
import { UserDataContext } from "@/contexts/AuthContext";
import useLikePost from "@/hooks/queries/useLikePost";
import { Post, PostGridType } from "@/types/post";
import { formatLikeCount } from "@/utils/formatCount";
import { relativeDate } from "@/utils/relativeDate";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BoardPhotoContent({
  post,
  type,
  queryKey,
}: {
  post: Post;
  type: PostGridType;
  queryKey: string[];
}) {
  const { accessToken } = useContext(UserDataContext);
  const { title, imageUrl, _id, isLiked, likeCount, commentsCount, user, createdAt } = post;
  const [likeState, setLikeState] = useState(isLiked);
  const [likeCountState, setLikeCountState] = useState(likeCount);
  const { mutate } = useLikePost({
    _id,
    accessToken,
    queryKey,
  });
  const router = useRouter();

  const handleLikeButtonOnclick = () => {
    if (accessToken == "logout" || accessToken == "") {
      toast.warning("로그인이 필요합니다.");
      return;
    }
    mutate({ likeState });
    setLikeCountState((prev) => (likeState ? prev - 1 : prev + 1));
    setLikeState((prev) => !prev);
  };
  return (
    <>
      <div className="relative h-full w-full rounded-md">
        <ModalTriggerButton
          loginRequired
          className="absolute right-2 top-0 "
          size="icon"
          content="more"
        >
          <MoreModal post={post} type="post" targetId={_id} targetUser={user} />
        </ModalTriggerButton>
        <Image
          src={imageUrl}
          alt={_id}
          priority
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="relative z-10 rounded-md object-cover"
        />
      </div>
      <div className="absolute top-0 z-10 flex h-full w-full flex-col justify-end bg-transparent bg-gradient-to-b from-transparent from-[40%] to-[#101010] p-1  md:px-2">
        <div className="flex w-full justify-between">
          <div className="flex w-3/5 flex-col">
            <h1 className=" truncate font-poorStory text-sm font-bold tracking-wider md:mb-1 md:text-lg">
              {title}
            </h1>
            <div className=" flex-nowrap truncate font-poorStory  text-sm tracking-wide text-slate-200">
              {relativeDate(createdAt)}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col items-center justify-center">
              <p className="  text-xs">{formatLikeCount(likeCountState)}</p>
              <LikeButton isLiked={likeState} onClick={handleLikeButtonOnclick} size="24" />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="  text-xs">{formatLikeCount(commentsCount)}</p>
              <CommentIcon size="24" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
