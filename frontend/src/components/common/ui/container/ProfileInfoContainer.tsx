import React, { ReactNode } from "react";

export default function ProfileInfoContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mb-10 w-full rounded-lg p-8 dark:bg-[#333333] ${className}`}
    >
      {children}
    </div>
  );
}
