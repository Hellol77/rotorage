export default function PostSkeletonCard() {
  return (
    <div className="flex h-full flex-col gap-3 rounded-lg p-4 dark:bg-[#18181b]">
      <div className="animate-pulse h-full w-full rounded-lg dark:bg-[#27272a]"></div>
      <div className="animate-pulse h-4 w-20 rounded-lg dark:bg-[#27272a]"></div>
      <div className="animate-pulse h-4 w-48 rounded-lg dark:bg-[#27272a]"></div>
    </div>
  );
}
