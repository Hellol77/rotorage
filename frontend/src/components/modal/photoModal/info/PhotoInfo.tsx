import { useEffect, useState } from "react";

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
  const [imageWidth, setImageWidth] = useState<number | undefined>();
  useEffect(() => {
    const imageElement = document.getElementById(imageUrl);
    setImageWidth(imageElement?.clientWidth);
  }, [imageUrl]);
  return (
    <div className="order-2 w-[90vw] flex-col flex-wrap border-[1px] border-gray-800 md:order-1 md:w-fit md:rounded-lg">
      <div className=" overflow-hidden md:rounded-t-lg ">
        <Image
          src={imageUrl}
          alt={title}
          width={800}
          height={800}
          id={imageUrl}
          className="h-fit  max-h-[53vh] w-[90vw] object-cover md:max-h-[600px] md:min-h-[600px] md:w-auto md:object-contain"
        />
      </div>
      <div className="flex  flex-col flex-wrap">
        <div
          style={{ maxWidth: imageWidth ? `${imageWidth}px` : "380px" }}
          className=" mt-1 h-fit max-h-[50px] max-w-[90vw] overflow-y-auto truncate break-all rounded-lg px-4 font-poorStory text-2xl tracking-wider scrollbar-hide md:max-w-[380px]"
        >
          {title}
        </div>
        <div
          style={{ maxWidth: imageWidth ? `${imageWidth}px` : "380px" }}
          className={`text-md  mb-2 h-fit max-h-[100px] max-w-[90vw] overflow-y-auto  whitespace-normal break-all px-4 pt-1 font-poorStory tracking-wide scrollbar-hide md:max-w-[380px] `}
        >
          {content}
        </div>
      </div>
    </div>
  );
}
