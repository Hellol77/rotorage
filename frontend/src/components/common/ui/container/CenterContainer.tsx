import React from "react";

export default function CenterContainer({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen w-screen justify-center overflow-x-hidden px-6 scrollbar-hide">
      <section className="mt-40 flex w-96 flex-col ">{children}</section>
    </main>
  );
}
