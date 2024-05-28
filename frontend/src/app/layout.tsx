import GoogleAnalytics from "@/app/googleAnalytics";
import "./globals.css";
import { Providers } from "@/app/providers";
import Footer from "@/components/common/footer/Footer";
import Navbar from "@/components/common/nav/Navbar";
import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";

const libreFranklin = Libre_Franklin({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hanroro",
  description: "Hanroro FanPage",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${libreFranklin.className} dark `}>
      <body className="z-1 max-w-full overflow-x-hidden text-[#F9F9F9]   scrollbar-hide dark:bg-[#101010]">
        <Providers>
          <header className="fixed top-0 z-[60] w-screen items-center justify-between md:w-auto">
            <div className=" mx-auto w-full ">
              <Navbar />
            </div>
          </header>
          {children}
          <Footer />
        </Providers>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
