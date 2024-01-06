"use client";
import CircleImageSection from "../components/section/CircleImageSection";
import BoardPhotoCard from "@/components/board/grid/card/BoardPhotoCard";
import BoardGridContainer from "@/components/common/ui/container/BoardGridContainer";
import useGetRecentPosts from "@/hooks/queries/useGetRecentPosts";

export default function Home() {
  const { data } = useGetRecentPosts();
  return (
    <main className="z-1  h-full  w-screen overflow-y-scroll scrollbar-hide ">
      <CircleImageSection />
      <section className="mt-20 px-6 md:mt-40 md:px-20">
        <h1 className=" mb-8 font-poorStory text-3xl">Recent Posts</h1>
        <BoardGridContainer>
          {data?.map((post) => (
            <BoardPhotoCard key={post.imageUrl} post={post} type="recent" />
          ))}
        </BoardGridContainer>
      </section>
    </main>
  );
}
