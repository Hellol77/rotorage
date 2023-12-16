import { Post, UpdatedPost } from "@/types/post";
import axios from "axios";

export const getBoardPosts = async ({ pageParam }: { pageParam: number }) => {
  const api = axios
    .get(`/api/post/${pageParam}`)
    .then(async (data) => {
      // const data: Post[] = await res.json();
      return { pages: data.data, pageParams: pageParam + 1 };
    })
    .catch((err) => {
      console.log(err);
      alert("게시글을 불러오는데 실패했습니다.");
      return { pages: [], pageParams: undefined };
    });
  return api;
};

export const uploadBoardPost = async ({
  imageUrl,
  title,
  content,
  password,
}: UpdatedPost) => {
  const formData = new FormData();
  formData.append("imgFile", imageUrl);
  formData.append("title", title);
  formData.append("content", content);
  formData.append("password", password);

  const api = await axios
    .post("/api/post", formData)
    .then(() => {
      return;
    })
    .catch((err) => {
      console.log(err.response);
      if (err.response.data === "password")
        alert("게시글을 업로드하는데 실패했습니다.");
      else if (err.response.data === "file")
        alert("이미지 파일을 업로드하는데 실패했습니다.");
      else alert("서버에 문제가 발생했습니다.");
    });
  return api;
};
