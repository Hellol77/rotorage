export const queryKeys = {
  boardPosts: ["boardPosts"],
  recentPosts: ["recentPosts"],
  getProfile: ["getProfile"],
  searchProfile: (_id: string) => ["searchProfile", _id],
};
