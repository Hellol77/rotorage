export const formatLikeCount = (likeCount: number) => {
  if (likeCount >= 1000) {
    return (likeCount / 1000).toFixed(1) + "K";
  }
  return likeCount.toString();
};
