import { Post, UpdatedPost } from "@/types/post";
import axios from "axios";
import { toast } from "react-toastify";

export const getBoardPosts = async ({ pageParam }: { pageParam: number }) => {
  const api = axios
    .get(`${process.env.NEXT_PUBLIC_BASE_URL}/post/page/${pageParam}`)
    .then(async (data) => {
      // const data: Post[] = await res.json();
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

export const getRecentPosts = async <T = Post[]>(): Promise<T> => {
  const { data } = await axios.get<T>(
    process.env.NEXT_PUBLIC_BASE_URL + `/post/recent`,
  );
  try {
    return data;
  } catch (err) {
    console.log(err);
  }
  return data;
};

export const likePost = async (accessToken: string, _id: string) => {
  const api = await axios
    .post("/api/post/like", { accessToken, _id })
    .then()
    .catch((err) => {
      console.log(err);
    });
  return api;
};
