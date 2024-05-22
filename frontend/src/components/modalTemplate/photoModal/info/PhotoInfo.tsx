import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import LikeButton from "@/components/common/button/LikeButton";
import { UserDataContext } from "@/contexts/AuthContext";
import useLikePost from "@/hooks/queries/useLikePost";
import { Post } from "@/types/post";
import { formatLikeCount } from "@/utils/formatCount";
import Image from "next/image";

export default function PhotoInfo({ post, queryKey }: { post: Post; queryKey: string[] }) {
  const { title, content, imageUrl, isLiked, likeCount, _id } = post;
  const [imageWidth, setImageWidth] = useState<number | undefined>();
  const [likeCountState, setLikeCountState] = useState(likeCount);
  const [likeState, setLikeState] = useState(isLiked);
  const { accessToken } = useContext(UserDataContext);
  const { mutate } = useLikePost({
    _id,
    accessToken,
    queryKey,
  });
  const handleLikeButtonOnclick = () => {
    if (accessToken == "logout" || accessToken == "") {
      toast.warning("로그인이 필요합니다.");
      return;
    }
    mutate({ likeState });
    setLikeCountState((prev) => (likeState ? prev - 1 : prev + 1));
    setLikeState((prev) => !prev);
  };

  useEffect(() => {
    const imageElement = document.getElementById(imageUrl);
    setImageWidth(imageElement?.clientWidth);
  }, [imageUrl]);
  return (
    <div className="order-2  w-[90vw] flex-col flex-wrap md:order-1 md:w-fit md:rounded-lg md:border-[1px] md:border-gray-800">
      <div className="flex  justify-center overflow-hidden md:rounded-t-lg">
        <Image
          src={imageUrl}
          alt={title}
          width={800}
          height={800}
          id={imageUrl}
          className="h-fit max-h-[45vh] w-[90vw]  border-[0.5px] border-gray-800 object-cover md:max-h-[600px] md:min-h-[600px] md:w-auto md:rounded-t-lg md:object-contain"
        />
      </div>
      <div className="flex w-full  justify-between px-4 py-2">
        <section className="flex h-full flex-col flex-nowrap md:min-w-96 md:max-w-full">
          <h2
            style={{ maxWidth: imageWidth ? `${imageWidth}px` : "380px" }}
            className="h-fit max-h-[50px] max-w-[90vw] overflow-y-auto   break-all  rounded-lg font-poorStory text-xl tracking-wider scrollbar-hide md:h-full md:max-h-[150px]"
          >
            {title}
          </h2>
          <p
            style={{ maxWidth: imageWidth ? `${imageWidth}px` : "380px" }}
            className={`md:text-md mb-2  h-fit max-h-[100px] max-w-[90vw] overflow-y-auto whitespace-normal  break-all pt-1 font-poorStory text-sm tracking-wide scrollbar-hide md:max-w-[380px] `}
          >
            {content}
          </p>
        </section>
        <section className="flex flex-col items-center ">
          <p className="  text-xs">{formatLikeCount(likeCountState)}</p>
          <LikeButton size="30" onClick={handleLikeButtonOnclick} isLiked={likeState} />
        </section>
      </div>
    </div>
  );
}
