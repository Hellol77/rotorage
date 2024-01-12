// import React from "react";

// export default function getInfinitePostsApi(url: string, pageParam: number,  accessToken?: string
//     ) {
//   const api = defaultApi
//     .get(`/api/post/page/${pageParam}`, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     })
//     .then(async (data) => {
//       return { pages: data.data, pageParams: pageParam + 1 };
//     })
//     .catch((err) => {
//       console.log(err);
//       toast.error("게시글을 불러오는데 실패했습니다.");
//       return { pages: [], pageParams: undefined };
//     });
//   return api;
// }
