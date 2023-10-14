import hanroroMainImage from "/public/photo/circle/hanroromain.png";
import hanroro1 from "/public//photo/circle/hanroro1.png";
import hanroro2 from "/public//photo/circle/hanroro2.png";
import CircleImage from "./components/CircleImage";
import Lines from "./components/Lines";
import VideoSection from "./components/section/VideoSection";

export default function Home() {
  const circlePhotoList = [hanroroMainImage, hanroro1, hanroro2];

  const changeNftImage = () => {
    const randomIndex = Math.floor(Math.random() * circlePhotoList.length);
    return circlePhotoList[randomIndex];
  };

  return (
    <main className="scrollbar-hide z-1 h-full w-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll">
      <section className="z-1 relative flex h-screen w-full snap-start items-center justify-center">
        <CircleImage image={circlePhotoList} />
        <Lines />
      </section>
      <VideoSection title="입춘" />
      <VideoSection title="정류장" />
      <VideoSection title="화해" />
      <VideoSection title="사랑하게 될 거야" />
    </main>
  );
}
