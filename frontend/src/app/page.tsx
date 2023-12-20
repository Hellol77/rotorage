import { getRecentPosts } from "@/apis/board";
import CircleImageSection from "../components/section/CircleImageSection";
import BoardPhotoCard from "@/components/board/grid/BoardPhotoCard";
import BoardGridContainer from "@/components/board/grid/BoardGridContainer";

export default async function Home() {
  const data = await getRecentPosts();
  console.log("recent", data);
  return (
    <main className="z-1  h-full  w-screen overflow-y-scroll scrollbar-hide ">
      <CircleImageSection />
      <section className="px-6 md:px-20">
        <h1 className=" text-2x mb-8 font-poorStory">Recent Posts</h1>
        <BoardGridContainer>
          {data.map(({ imageUrl, content, title }) => (
            <BoardPhotoCard
              key={imageUrl}
              imageUrl={imageUrl}
              title={title}
              content={content}
            />
          ))}
        </BoardGridContainer>
      </section>
    </main>
  );
}
