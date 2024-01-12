import React, { useContext } from "react";

import { queryKeys } from "@/apis/querykeys";
import Loading from "@/components/common/skeleton/PostSkeletonGrid";
import BoardPhotoCard from "@/components/common/card/BoardPhotoCard";
import BoardGridContainer from "@/components/common/ui/container/BoardGridContainer";
import { UserDataContext } from "@/contexts/AuthContext";
import { Post } from "@/types/post";

interface ProfileMYPostsProps {
  isLoading: boolean;
  userData: Post[];
}

export default function ProfileMyPosts({
  isLoading,
  userData,
}: ProfileMYPostsProps) {
  const { user, accessToken } = useContext(UserDataContext);

  return (
    <>
      {isLoading || accessToken === "" ? (
        <Loading />
      ) : (
        <>
          <BoardGridContainer>
            {userData?.map((post: Post) => (
              <BoardPhotoCard
                key={post._id}
                post={post}
                type="default"
                queryKey={queryKeys.getUserPosts(user.userId)}
              />
            ))}
          </BoardGridContainer>
        </>
      )}
    </>
  );
}
