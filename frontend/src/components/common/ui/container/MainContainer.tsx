import React from "react";

export default function MainContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={`z-1 mx-auto flex h-full min-h-screen max-w-[1280px] overflow-x-hidden px-6 pt-20 scrollbar-hide  md:px-20  md:pt-36 ${className}`}
    >
      {children}
    </main>
  );
}
