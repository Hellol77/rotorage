import { toast } from "react-toastify";

import { defaultApi } from "@/apis/index";
import { Post, UpdatePostPropsType } from "@/types/post";

export const getBoardPosts = async ({
  pageParam,
  accessToken,
}: {
  pageParam: number;
  accessToken?: string;
}) => {
  const api = defaultApi
    .get(`/api/post/page/${pageParam}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then(async (data) => {
      return { pages: data.data, pageParams: pageParam + 1 };
    })
    .catch((err) => {
      console.log(err);
      toast.error("게시글을 불러오는데 실패했습니다.");
      return { pages: [], pageParams: undefined };
    });
  return api;
};

export const uploadBoardPost = async ({
  imageUrl,
  title,
  content,
  user,
  accessToken,
}: UpdatePostPropsType) => {
  const formData = new FormData();
  formData.append("imgFile", imageUrl);
  formData.append("title", title);
  formData.append("content", content);
  formData.append("user", user);
  const api = await defaultApi.post("/api/post", formData, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return api;
};

export const getRecentPosts = async <T = Post[]>(accessToken: string): Promise<T> => {
  const { data } = await defaultApi.get<T>(`/api/post/recent`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  try {
    return data;
  } catch (err) {
    console.log(err);
  }
  return data;
};

export const likePost = async ({ _id, accessToken }: { _id: string; accessToken: string }) => {
  const api = await defaultApi
    .post("/api/post/like", { _id }, { headers: { Authorization: `Bearer ${accessToken}` } })
    .then()
    .catch((err) => {
      console.log(err);
    });

  return api;
};

export const getUserPosts = async ({
  pageParam,
  accessToken,
  userId,
}: {
  pageParam: number;
  accessToken?: string;
  userId: string;
}) => {
  try {
    const { data } = await defaultApi.get(`/api/post/user/${userId}?page=${pageParam}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return { pages: data, pageParams: pageParam + 1 };
  } catch (err) {
    toast.error("게시글을 불러오는데 실패했습니다.");
    return { pages: [], pageParams: undefined };
  }
};

export const getLikedPosts = async ({
  pageParam,
  accessToken,
}: {
  pageParam: number;
  accessToken?: string;
}) => {
  try {
    const { data } = await defaultApi.get(`/api/post/like?page=${pageParam}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return { pages: data, pageParams: pageParam + 1 };
  } catch (err) {
    toast.error("게시글을 불러오는데 실패했습니다.");
    return { pages: [], pageParams: undefined };
  }
};
