import hanroroMainImage from "/public/photo/circle/hanroromain.png";
import hanroro1 from "/public//photo/circle/hanroro1.png";
import hanroro2 from "/public//photo/circle/hanroro2.png";
import CircleImage from "./components/CircleImage";
import Line from "./components/Line";

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
        <div className=" absolute flex w-full flex-col gap-8 md:mt-10 md:gap-20">
          <Line
            text={`Even if you leave `}
            color="red"
            deg="1deg"
            direction={-1}
          />
          <Line
            text="Let Me Love My Youth "
            color="yellow"
            deg="28deg"
            direction={-1}
          />
          <Line
            text="The last stop of our pain "
            color="green"
            deg="1deg"
            direction={-1}
          />
          <Line
            text="Landing in Love "
            color="blue"
            deg="6deg"
            direction={-1}
          />
        </div>
      </section>
      <section className="flex h-screen  w-full items-center justify-center overflow-hidden">
        <CircleImage image={circlePhotoList} />
        <div className=" absolute mt-32 flex w-full flex-col gap-8 md:mt-10 md:gap-20">
          <Line
            text={`Even if you leave `}
            color="red"
            deg="1deg"
            direction={-1}
          />
          <Line
            text="Let Me Love My Youth "
            color="yellow"
            deg="28deg"
            direction={-1}
          />
          <Line
            text="The last stop of our pain "
            color="green"
            deg="1deg"
            direction={-1}
          />
          <Line
            text="Landing in Love "
            color="blue"
            deg="6deg"
            direction={-1}
          />
        </div>
      </section>
    </main>
  );
}
