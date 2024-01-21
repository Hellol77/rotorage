import { PostUserType, UserData } from "@/types/user";

export type Post = {
  user: PostUserType;
  title: string;
  content: string;
  comments: Comment[];
  likeCount: number;
  imageUrl: string;
  isLiked: boolean;
  _id: string;
  createdAt: Date;
  commentsCount: number;
};

export type UpdatedPost = Omit<
  Post,
  "user" | "_id" | "comments" | "likeCount" | "imageUrl" | "isLiked" | "createdAt" | "commentsCount"
> & {
  user: string;
  imageUrl: File;
};

export type DefaultUpdatePostType = Omit<Post, "user" | "imageUrl" | "title" | "content">;
// export type UpdatedPost = Omit<Post, 'user'> & { user: string; imageUrl: File };

export interface Comment {
  _id: string;
  user: UserData;
  content: string;
  createdAt: Date;
}

export interface BoardPosts {
  pages: Post[];
  pageParams: number;
}

export interface InfiniteBoardPosts {
  pages: BoardPosts[];
  pageParams: number;
}
export type PostGridType = "default" | "infinite";

export type UpdatePostPropsType = { accessToken: string } & UpdatedPost;
