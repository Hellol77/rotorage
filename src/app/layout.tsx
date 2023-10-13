import "./globals.css";
import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import Navbar from "./components/Navbar";

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
      <body className="w-full overflow-hidden dark:bg-[#101010]">
        <header className="   fixed top-0 z-40">
          <div className=" mx-auto w-full  text-white">
            <Navbar />
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
