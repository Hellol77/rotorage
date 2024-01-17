export const formatLikeCount = (count: number | undefined) => {
  console.log(count);
  if (!count) {
    return "0";
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "K";
  }
  return count.toString();
};
