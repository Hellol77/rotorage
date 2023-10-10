import hanroroMainImage from "/public/photo/hanroromain.png";
import CircleImage from "./components/CircleImage";
export default function Home() {
  return (
    <main className="w-full">
      <section className="flex  items-center justify-center">
        <CircleImage image={hanroroMainImage} />
      </section>
    </main>
  );
}
