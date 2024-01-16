import React, { ReactNode } from "react";

import Link from "next/link";

export default function ProfileLinkButton({
  text,
  href,
  children,
}: {
  text: string;
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex h-full w-full items-center justify-center gap-4 rounded-xl hover:bg-[#272727] md:h-12 md:justify-start md:pl-2"
    >
      {children}
      <p>{text}</p>
    </Link>
  );
}
