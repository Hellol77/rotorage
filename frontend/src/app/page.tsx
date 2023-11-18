import hanroroMainImage from "/public/photo/circle/hanroromain.png";
import hanroro2 from "/public//photo/circle/hanroro2.png";
import CircleImageSection from "../components/section/CircleImageSection";

export default function Home() {
  const circlePhotoList = [hanroroMainImage, hanroro2];

  return (
    <main className="z-1 h-full w-screen overflow-x-hidden overflow-y-scroll scrollbar-hide md:h-screen md:snap-y  md:snap-mandatory">
      <CircleImageSection />
    </main>
  );
}
