import Image from "next/image";

export default function PhotoInfo({
  imageUrl,
  title,
  content,
}: {
  imageUrl: string;
  title: string;
  content: string;
}) {
  return (
    <div className="flex w-fit flex-col">
      <Image
        src={imageUrl}
        alt={title}
        width={500}
        height={500}
        className="object-cover h-full md:min-h-[600px] md:object-contain"
      />
      <div className=" z-50 mt-4 h-fit w-full justify-end px-4 font-poorStory text-2xl tracking-wider">
        {title}
      </div>
      <div className="z-50 h-fit break-all px-4 pb-6 pt-2 font-poorStory tracking-wide ">
        {content}
      </div>
    </div>
  );
}
