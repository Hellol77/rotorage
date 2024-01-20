import React, { ReactNode } from "react";

import Link from "next/link";

export default function ProfileLinkButton({
  text,
  href,
  children,
  className,
}: {
  text: string;
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`${className} } flex h-full w-full items-center justify-center gap-2 rounded-xl hover:bg-[#272727] md:h-12 md:justify-start md:px-2 `}
    >
      {children}
      <p>{text}</p>
    </Link>
  );
}
