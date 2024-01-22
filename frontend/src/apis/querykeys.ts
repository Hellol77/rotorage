export const queryKeys = {
  boardPosts: ["boardPosts"],
  recentPosts: ["recentPosts"],
  getProfile: ["getProfile"],
  searchProfile: (_id: string) => ["searchProfile", _id],
  getUserPosts: ["getUserPosts"],
  getLikedPosts: ["getLikedPosts"],
  addComment: (postId: string) => ["addComment", postId],
};
