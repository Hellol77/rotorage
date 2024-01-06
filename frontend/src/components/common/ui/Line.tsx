"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import useResizeObserver from "@/utils/useResizeObserver";

type Color = "red" | "blue" | "green" | "yellow";
type Props = {
  text: string;
  deg: string;
  color: Color;
  vector: number;
};

export default function Line({ text, deg, color, vector }: Props) {
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

  const calculateCount = useCallback((vector: number) => {
    if (
      textDivRef.current &&
      numberRef.current > textDivRef.current.scrollWidth / 2
    ) {
      textDivRef.current.style.transform = "translateX(0)";
      numberRef.current = 0;
    }
    if (textDivRef.current) {
      textDivRef.current.style.transform = `translateX(${
        numberRef.current * vector
      }px)`;
    }
    return numberRef.current;
  }, []);

  const animate = useCallback(() => {
    numberRef.current += 0.5;
    numberRef.current = calculateCount(vector);

    window.requestAnimationFrame(animate);
  }, [calculateCount, vector]);

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
        rotate: deg,
      }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        ease: [0, 0.71, 0.2, 1.01],
        stiffness: 400,
        damping: 15,
      }}
      className={`${getBaseStyle(
        color,
        vector,
      )} relative flex w-screen overflow-hidden whitespace-nowrap  font-yellowTail text-2xl tracking-widest `}
    >
      <div ref={textDivRef} className="text-black">
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

const getBaseStyle = (color: Color, vector: number) => {
  // const baseStyle = "flex w-screen font-yellowTail overflow-hidden";
  const vectorStyle = vector < 0 ? "" : "justify-end";
  const bgColorStyle = colorSelect(color);
  // const degStyle = getRotateStyle(deg);
  return `${bgColorStyle} ${vectorStyle}`;
};
