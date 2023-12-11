export type Post = {
  title: string;
  content: string;
  imageUrl: string;
  password: string;
};

export type UpdatedPost = {
  title: string;
  content: string;
  imageUrl: File;
  password: string;
};
