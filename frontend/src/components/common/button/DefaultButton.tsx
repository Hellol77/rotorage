import React from "react";

interface DefaultButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  text: string;
  onClick: () => void;
  color?: "default" | "primary" | "danger" | "success";
}

export default function DefaultButton({
  text,
  className,
  color = "default",
  onClick,
  disabled,
  ...props
}: DefaultButtonProps) {
  return (
    <button
      disabled={disabled}
      className={` ${getColor(color)} h-full rounded-lg ${disabled ? "opacity-50" : ""} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

const getColor = (color: string) => {
  switch (color) {
    case "default":
      return "bg-[#27272a] text-white hover:bg-[#363636]";
    case "primary":
      return "bg-[#2f80ed] text-white";
    case "danger":
      return "bg-[#eb5757] text-white ";
    case "success":
      return "bg-[#6fcf97] text-white";
    default:
      return "bg-[#27272a] text-white ";
  }
};
