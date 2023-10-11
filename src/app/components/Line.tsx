"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import useResizeObserver from "../hooks/useResizeObserver";

type Color = "red" | "blue" | "green" | "yellow";
type Props = {
  text: string;
  deg: string;
  color: Color;
  direction: 1 | -1;
};

export default function Line({ text, deg, color, direction }: Props) {
  // const newText = ()=>{
  //   const arr=[]
  //   arr.push(...text)
  // for(let i =0;i<arr.length;i++)
  // }
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
    <div ref={ref} className={getBaseStyle(color, deg)}>
      <div
        ref={textDivRef}
        className={`flex whitespace-nowrap  text-2xl  tracking-widest`}
      >
        {divText}
      </div>
    </div>
  );
}

const colorSelect = (color: Color): string => {
  switch (color) {
    case "red":
      return "bg-[#FF0060] rotate-[1.758deg]";
    case "yellow":
      return "bg-[#F6FA70] rotate-[-1.344deg]";
    case "green":
      return "bg-[#00DFA2] rotate-[0.042deg]";
    case "blue":
      return "bg-[#0079FF] rotate-[-2.717deg]";
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
