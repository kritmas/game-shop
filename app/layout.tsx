import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Intro from "@/components/Intro";
import FloatingSupport from "@/components/FloatingSupport";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GameShop — пополнение игровой валюты",
  description:
    "Быстрое и безопасное пополнение игровых аккаунтов и покупка подарочных карт",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body className="min-h-full flex flex-col bg-space text-ink font-sans">
        <Intro>{children}</Intro>
        <FloatingSupport />
      </body>
    </html>
  );
}