"use client";

import Script from "next/script";

export default function GoogleAnalytics() {
  return (
    <>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-K3905R1WDZ"></Script>
      <Script id="ga-script">
        {` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-K3905R1WDZ');`}
      </Script>
    </>
  );
}
