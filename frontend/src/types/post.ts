export type Post = {
  user: { userId: string; nickname: string };
  title: string;
  content: string;
  comments: Comment[];
  likeCount: number;
  imageUrl: string;
  _id: string;
};

export type UpdatedPost = Omit<
  Post,
  "user" | "_id" | "comments" | "likeCount" | "imageUrl"
> & {
  user: string;
  imageUrl: File;
};

// export type UpdatedPost = Omit<Post, 'user'> & { user: string; imageUrl: File };

export interface Comment {
  user: string;
  content: string;
  createdAt: Date;
}
