import React, { ReactNode } from "react";

export default function ProfileInfoContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-20 w-full  rounded-lg dark:bg-[#18181b] md:p-8  ${className}`}>
      {children}
    </div>
  );
}
