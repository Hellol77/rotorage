import hanroroMainImage from "/public/photo/hanroromain.png";
import CircleImage from "./components/CircleImage";
import Line from "./components/Line";

export default function Home() {
  return (
    <main className="w-full">
      <section className="flex  items-center justify-center overflow-x-hidden">
        <CircleImage image={hanroroMainImage} />
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
