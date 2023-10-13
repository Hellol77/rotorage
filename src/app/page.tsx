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
    const randomNftImg = circlePhotoList[randomIndex];
    return randomNftImg;
  };
  return (
    <>
      <main className="z-1 h-full w-screen  snap-y snap-mandatory overflow-x-hidden overflow-y-scroll">
        <section className="z-1 relative flex h-screen w-full snap-start  items-center justify-center ">
          <CircleImage image={circlePhotoList} />
          <Lines />
        </section>
        <VideoSection />
        {/* <section className="relative z-10 flex h-full w-screen snap-start overflow-x-hidden  overflow-y-hidden   ">
          <video
            className=" z-30 h-full w-full overflow-y-hidden object-cover opacity-80"
            src={require("/public//video/video1.mp4")}
            autoPlay
            muted
            playsInline
            loop
          ></video>
          <motion.div className="absolute top-0 z-30 h-full w-screen bg-transparent bg-gradient-to-l from-transparent from-30% via-black to-black  md:from-5% md:via-100%"></motion.div>
        </section> */}
      </main>
    </>
  );
}
