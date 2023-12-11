import CircleImageSection from "../components/section/CircleImageSection";

export default function Home() {
  return (
    <main className="z-1  h-full  w-screen overflow-y-scroll scrollbar-hide ">
      <CircleImageSection />
      <h1 className=" font-poorStory text-3xl">Recent Boards</h1>
    </main>
  );
}
