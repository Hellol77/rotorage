import { Post, UpdatedPost } from "@/types/post";
import axios from "axios";
import { toast } from "react-toastify";

export const getBoardPosts = async ({
  pageParam,
  accessToken,
}: {
  pageParam: number;
  accessToken?: string;
}) => {
  const api = axios
    .get(`${process.env.NEXT_PUBLIC_BASE_URL}/post/page/${pageParam}`, {
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
}: UpdatedPost) => {
  const formData = new FormData();
  formData.append("imgFile", imageUrl);
  formData.append("title", title);
  formData.append("content", content);
  formData.append("user", user);

  const api = await axios
    .post("/api/post", formData)
    .then(() => {
      return;
    })
    .catch((err) => {
      console.log(err.response);
      toast.error("이미지 파일을 업로드하는데 실패했습니다.");
    });
  return api;
};

export const getRecentPosts = async <T = Post[]>(
  accessToken: string,
): Promise<T> => {
  const { data } = await axios.get<T>(
    process.env.NEXT_PUBLIC_BASE_URL + `/post/recent`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  try {
    return data;
  } catch (err) {
    console.log(err);
  }
  return data;
};

export const likePost = async ({
  _id,
  accessToken,
}: {
  _id: string;
  accessToken: string;
}) => {
  const api = await axios
    .post(
      process.env.NEXT_PUBLIC_BASE_URL + "/post/like",
      { _id },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    )
    .then()
    .catch((err) => {
      console.log(err);
    });

  return api;
};
