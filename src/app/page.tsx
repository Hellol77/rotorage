import hanroroMainImage from "/public/photo/circle/hanroromain.png";
import hanroro1 from "/public//photo/circle/hanroro1.png";
import hanroro2 from "/public//photo/circle/hanroro2.png";
import CircleImage from "./components/CircleImage";
import Line from "./components/Line";
import Lines from "./components/Lines";

export default function Home() {
  const circlePhotoList = [hanroroMainImage, hanroro1, hanroro2];

  const changeNftImage = () => {
    const randomIndex = Math.floor(Math.random() * circlePhotoList.length);
    const randomNftImg = circlePhotoList[randomIndex];
    return randomNftImg;
  };
  return (
    <>
      <main className="scrollbar-hide h-full w-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll">
        <section className="relative flex h-screen w-full snap-start  items-center justify-center ">
          <CircleImage image={circlePhotoList} />
          <Lines />
        </section>
        <section className="relative flex h-screen w-full snap-start  items-center justify-center ">
          <CircleImage image={circlePhotoList} />
          <Lines />
        </section>
      </main>
      {/* <main className="h-full w-screen snap-x snap-mandatory"> */}
      {/* <section className="relative flex h-screen w-full  items-center justify-center ">
        <CircleImage image={circlePhotoList} />
        <Lines />
      </section>
      <section className="relative flex h-screen w-full  items-center justify-center ">
        <CircleImage image={circlePhotoList} />
        <Lines />
      </section> */}
      {/* </main> */}
    </>
  );
}
