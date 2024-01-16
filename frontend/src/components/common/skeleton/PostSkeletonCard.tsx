export default function PostSkeletonCard() {
  return (
    <div className="flex h-60 flex-col gap-3 rounded-lg p-4 dark:bg-[#1a1a1c] md:h-96">
      <div className="h-full w-full animate-pulse rounded-lg dark:bg-[#27272a]"></div>
      <div className="h-4 w-20 animate-pulse rounded-lg dark:bg-[#27272a]"></div>
      <div className="h-4 w-full animate-pulse rounded-lg dark:bg-[#27272a]"></div>
    </div>
  );
}
