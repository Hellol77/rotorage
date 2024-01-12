export const queryKeys = {
  boardPosts: ["boardPosts"],
  recentPosts: ["recentPosts"],
  getProfile: ["getProfile"],
  searchProfile: (_id: string) => ["searchProfile", _id],
  getUserPosts: (user_id: string) => ["getUserPosts", user_id],
};
