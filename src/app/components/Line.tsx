"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import useResizeObserver from "../hooks/useResizeObserver";
import { motion } from "framer-motion";

type Color = "red" | "blue" | "green" | "yellow";
type Props = {
  text: string;
  deg: string;
  color: Color;
  direction: 1 | -1;
};

export default function Line({ text, deg, color, direction }: Props) {
  const textDivRef = useRef<HTMLDivElement | null>(null);
  const requestRef = useRef<number>(0);
  const numberRef = useRef<number>(0);
  const [divText, setDivText] = useState("");
  const onResize = useCallback(
    (target: HTMLDivElement) => {
      const divWidth = target.clientWidth;
      let newText = text;
      if (divWidth) {
        while (newText.length * 8 < divWidth * 2) {
          newText += text; // 텍스트를 더해줍니다. 여기서 8은 예제에서 한 글자의 평균 너비를 나타냅니다.
        }
      }
      setDivText(newText);
    },
    [text],
  );

  const ref = useResizeObserver(onResize);

  const calculateCount = useCallback((direction: number) => {
    if (
      textDivRef.current &&
      numberRef.current > textDivRef.current.scrollWidth / 2
    ) {
      console.log(textDivRef.current.scrollWidth);
      textDivRef.current.style.transform = "translateX(0)";
      numberRef.current = 0;
    }
    if (textDivRef.current) {
      console.log("done");
      textDivRef.current.style.transform = `translateX(${
        numberRef.current * direction
      }px)`;
    }
    return numberRef.current;
  }, []);

  const animate = useCallback(() => {
    numberRef.current += 0.5;
    numberRef.current = calculateCount(direction);

    window.requestAnimationFrame(animate);
  }, [calculateCount, direction]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        scale: 0.5,
        rotate: rotateSelect(color),
      }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        ease: [0, 0.71, 0.2, 1.01],
        stiffness: 400,
        damping: 15,
      }}
      whileHover={{ scale: 1.3 }}
      className={getBaseStyle(color, deg)}
    >
      <div
        ref={textDivRef}
        className={`flex whitespace-nowrap  text-2xl  tracking-widest`}
      >
        {divText}
      </div>
    </motion.div>
  );
}

const colorSelect = (color: Color): string => {
  switch (color) {
    case "red":
      return "bg-[#FF0060] ";
    case "yellow":
      return "bg-[#F6FA70] ";
    case "green":
      return "bg-[#00DFA2] ";
    case "blue":
      return "bg-[#0079FF] ";
    default:
      throw new Error("color Error");
  }
};
const rotateSelect = (color: Color): string => {
  switch (color) {
    case "red":
      return "1.758deg";
    case "yellow":
      return "-1.344deg";
    case "green":
      return "1.5deg";
    case "blue":
      return "-2.717deg";
    default:
      throw new Error("color Error");
  }
};

// const getRotateStyle = (deg: string): string => {
//   return `rotate-[${deg}]`;
// };

const getBaseStyle = (color: Color, deg: string) => {
  const baseStyle = "flex w-screen font-yellowTail overflow-hidden";
  const bgColorStyle = colorSelect(color);
  // const degStyle = getRotateStyle(deg);
  return `${baseStyle} ${bgColorStyle}`;
};
