import React from "react";

type Props = {
  text: string;
  color: "red" | "blue" | "green" | "yellow";
  
};

export default function Line({ text, color }: Props) {
  return (
    <div className=" absolute">
      <p>{text}</p>
    </div>
  );
}
