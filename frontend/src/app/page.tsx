"use client";
import { queryKeys } from "@/apis/querykeys";
import BoardPhotoCard from "@/components/common/card/boardPhotoCard/BoardPhotoCard";
import BoardGridContainer from "@/components/common/container/BoardGridContainer";
import CircleImageSection from "@/components/common/section/CircleImageSection";
import useGetRecentPosts from "@/hooks/queries/useGetRecentPosts";

export default function Home() {
  const { data } = useGetRecentPosts();
  return (
    <main className="z-1 relative  h-full w-screen  items-center overflow-y-scroll scrollbar-hide ">
      <CircleImageSection />
      <section className=" mx-auto mt-20 w-full max-w-[1280px] px-6 md:mt-40 md:px-20">
        <h1 className=" mb-8 font-poorStory text-3xl">Recent Posts</h1>
        <BoardGridContainer>
          {data?.map((post) => (
            <BoardPhotoCard
              key={post.imageUrl}
              post={post}
              type="default"
              queryKey={queryKeys.recentPosts}
            />
          ))}
        </BoardGridContainer>
      </section>
    </main>
  );
}
