import { toast } from "react-toastify";

import { defaultApi } from "@/apis/index";

export const checkAdmin = async (accessToken: string) => {
  try {
    const { data } = await defaultApi.get("/api/admin", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  } catch (err) {
    console.log("checkAdmin err ", err);
    throw err;
  }
};

export const getReportedPosts = async ({
  pageParam,
  accessToken,
}: {
  pageParam: number;
  accessToken?: string;
}) => {
  const api = defaultApi
    .get(`/api/admin/post/${pageParam}`, {
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

export const getReportedComments = async ({
  pageParam,
  accessToken,
}: {
  pageParam: number;
  accessToken?: string;
}) => {
  const api = defaultApi
    .get(`/api/admin/comment/${pageParam}`, {
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
