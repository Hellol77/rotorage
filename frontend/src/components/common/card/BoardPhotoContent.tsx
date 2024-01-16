import React, { useContext, useState } from "react";

import LikeButton from "@/components/common/button/LikeButton";
import { UserDataContext } from "@/contexts/AuthContext";
import useLikePost from "@/hooks/queries/useLikePost";
import { Post, PostGridType } from "@/types/post";
import { formatLikeCount } from "@/utils/formatLikeCount";
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
  const { title, content, imageUrl, _id, isLiked, likeCount } = post;
  const [likeState, setLikeState] = useState(isLiked);
  const { mutateLikeDefailtPost, mutateLikeInfinitePost } = useLikePost({
    _id,
    accessToken,
    queryKey,
  });
  const router = useRouter();

  const handleLikeButtonOnclick = () => {
    if (accessToken == "logout" || accessToken == "") {
      router.push("login");
      return;
    }
    setLikeState((prev) => !prev);

    switch (type) {
      case "infinite":
        mutateLikeInfinitePost();
        break;
      case "default":
        mutateLikeDefailtPost();
        return;
    }
  };

  return (
    <>
      <div className="relative h-full w-full rounded-md">
        <Image
          src={imageUrl}
          alt={title}
          priority
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="relative z-10 rounded-md object-cover"
        />
      </div>
      <div className="absolute top-0 z-10 flex h-full w-full flex-col justify-end bg-transparent bg-gradient-to-b from-transparent from-[40%] to-[#101010] px-2 py-2  md:px-4 md:py-4">
        <div className="flex justify-between">
          <div className="flex flex-col ">
            <h1 className="truncate font-poorStory text-sm font-bold tracking-wider md:mb-1 md:text-lg">
              {title}
            </h1>
            <div className=" flex-nowrap truncate font-poorStory  text-sm tracking-wide text-slate-200">
              {content}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="  text-xs">{formatLikeCount(likeCount)}</p>
            <LikeButton isLiked={likeState} onClick={handleLikeButtonOnclick} size="24" />
          </div>
        </div>
      </div>
    </>
  );
}