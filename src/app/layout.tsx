import { Metadata } from "next";
import "./globals.css";

import { satoshi } from "@/utils/font";

export const metadata: Metadata = {
  title: "Omniaxus",
  description: "Home of amazing products for you and your love ones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={satoshi.className}>{children}</body>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4115406660116385"
        crossOrigin="anonymous"
      ></script>
    </html>
  );
}
