export type Post = {
  user: { userId: string; nickname: string };
  title: string;
  content: string;
  comments?: Comment[];
  likes?: number;
  imageUrl: string;
  _id: string;
};

export interface UpdatedPost {
  user: string;
  title: string;
  content: string;
  imageUrl: File;
  comments?: Comment[];
  likes?: number;
}

export interface Comment {
  user: string;
  content: string;
  createdAt: Date;
}
