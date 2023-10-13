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
    <main className="h-full">
      <section className="flex h-screen w-full  items-center justify-center ">
        <CircleImage image={circlePhotoList} />
        <Lines />
      </section>
      <section className="flex h-screen w-full  items-center justify-center ">
        <CircleImage image={circlePhotoList} />
        <Lines />
      </section>
    </main>
  );
}
