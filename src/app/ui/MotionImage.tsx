import { StaticImageData } from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function MotionImage({
  image,
  className,
}: {
  image: StaticImageData;
  className: string;
}) {
  return (
    <motion.div className={`${className} h-full `} whileHover={{ scale: 1.02 }}>
      <Image src={image} className="object-cover" alt={`${image}`} />
    </motion.div>
  );
}
