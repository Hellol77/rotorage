export type Post = {
  title: string;
  content: string;
  imageUrl: string;
};

export type UpdatedPost = {
  title: string;
  content: string;
  imageUrl: File;
};
