import CircleImageSection from "../components/section/CircleImageSection";

export default function Home() {
  return (
    <main className="z-1  h-full  w-screen overflow-y-scroll scrollbar-hide ">
      <CircleImageSection />

      <section className="px-6 md:px-20">
        <h1 className=" font-poorStory text-2xl ">Recent Boards</h1>
      </section>
    </main>
  );
}
