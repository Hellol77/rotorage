import "./globals.css";
import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import Navbar from "../components/common/nav/Navbar";
import { Providers } from "./providers";

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
      <body className="z-1  min-h-screen max-w-full overflow-x-hidden text-white scrollbar-hide dark:bg-[#101010]">
        <Providers>
          <header className="fixed top-0 z-40 w-screen items-center justify-between md:w-auto">
            <div className=" mx-auto w-full  text-white">
              <Navbar />
            </div>
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
