import "./globals.css";
import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import Navbar from "./components/Navbar";
import { Menu } from "./components/menu/Menu";

const libreFranklin = Libre_Franklin({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hanroro",
  description: "Hanroro FanPage",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${libreFranklin.className} dark `}>
      <body className="z-1  w-full scrollbar-hide  dark:bg-[#101010]">
        <header className="fixed top-0 z-40 w-screen items-center justify-between md:w-auto">
          <div className=" mx-auto w-full  text-white">
            <Navbar />
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
