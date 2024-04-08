import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Noto_Serif_Khojki } from "next/font/google";

export const metadata: Metadata = {
  title: "lalit is a dev",
  description: "Cookie-cutter, shaped like you and me, Win a couple, A couple things I see, In the middle, Until they fix the heat, We can cuddle, We can cuddle",
  authors: [{name: "Lalit M", url: "https://github.com/lalitm1004"}]
};

/* Font Setup */
const nexaExtraLight = localFont({
  src: "../public/fonts/Nexa-ExtraLight.ttf",
  variable: "--font-nexa-extralight"
})

const nexaHeavy = localFont({
  src: "../public/fonts/Nexa-Heavy.ttf",
  variable: "--font-nexa-heavy",
})

const ztChintzyRegular = localFont({
  src: "../public/fonts/ZTChintzy-Regular.ttf",
  variable: "--font-chintzy-regular"
})

const ztChintzySemiBold = localFont({
  src: "../public/fonts/ZTChintzy-SemiBold.ttf",
  variable: "--font-chintzy-semibold"
})

const interRegular = localFont({
  src: "../public/fonts/Inter-Regular.ttf",
  variable: "--font-inter-regular"
})

const interBold = localFont({
  src: "../public/fonts/Inter-Bold.ttf",
  variable: "--font-inter-bold"
})

const terminal = localFont({
  src: "../public/fonts/Terminal.ttf",
  variable: "--font-terminal"
})

const notoSerifKhojiki = Noto_Serif_Khojki({
  subsets: ["latin"],
  variable: "--font-noto-serif-khojki"
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interRegular.variable} ${interBold.variable} ${nexaExtraLight.variable} ${nexaHeavy.variable} ${ztChintzyRegular.variable} ${ztChintzySemiBold.variable} ${notoSerifKhojiki.variable}`}
    >
      <body className={`${interRegular.className}`}>
        {children}
      </body>
    </html>
  );
}
