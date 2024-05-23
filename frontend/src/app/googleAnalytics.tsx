"use client";

import Script from "next/script";

export default function GoogleAnalytics() {
  return (
    <>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-ZE03PRDYFS"></Script>
      <Script id="ga-script">
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-ZE03PRDYFS');`}
      </Script>
    </>
  );
}
