export const formatLikeCount = (count: number | undefined) => {
  if (!count) {
    return "0";
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "K";
  }
  return count.toString();
};
