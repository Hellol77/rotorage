import { DefaultUpdatePostType } from "./../types/post";

export const DEFAULT_UPDATED_POST: DefaultUpdatePostType = {
  _id: "",
  isLiked: false,
  comments: [],
  likeCount: 0,
  commentsCount: 0,
  createdAt: new Date(),
};
