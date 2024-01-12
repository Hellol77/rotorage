export type Post = {
  user: { userId: string; nickname: string };
  title: string;
  content: string;
  comments: Comment[];
  likeCount: number;
  imageUrl: string;
  isLiked: boolean;
  _id: string;
};

export type UpdatedPost = Omit<
  Post,
  "user" | "_id" | "comments" | "likeCount" | "imageUrl" | "isLiked"
> & {
  user: string;
  imageUrl: File;
};

export type DefaultUpdatePostType = Omit<
  Post,
  "user" | "imageUrl" | "title" | "content"
>;
// export type UpdatedPost = Omit<Post, 'user'> & { user: string; imageUrl: File };

export interface Comment {
  user: string;
  content: string;
  createdAt: Date;
}

export interface BoardPosts {
  pages: Post[];
  pageParams: number;
}

export type PostGridType = "default" | "infinite";

export type UpdatePostPropsType = { accessToken: string } & UpdatedPost;
