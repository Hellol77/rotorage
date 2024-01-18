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
    <div className="order-2 flex w-fit flex-col md:order-1">
      <Image
        src={imageUrl}
        alt={title}
        width={800}
        height={800}
        className="h-fit max-h-[53vh] w-[90vw] object-cover md:max-h-[600px] md:min-h-[600px] md:w-auto md:object-contain"
      />
      <div className=" mt-4 h-fit w-full justify-end px-4 font-poorStory text-2xl tracking-wider">
        {title}
      </div>
      <div className=" h-fit break-all px-4 pb-6 pt-2 font-poorStory tracking-wide ">{content}</div>
    </div>
  );
}
