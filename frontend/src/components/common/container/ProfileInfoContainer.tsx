import React, { ReactNode } from "react";

export default function ProfileInfoContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-20 w-full rounded-lg p-8 dark:bg-[#18181b]  ${className}`}>{children}</div>
  );
}
