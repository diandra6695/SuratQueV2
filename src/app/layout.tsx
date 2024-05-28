import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { GeistSans } from "geist/font/sans";
import NextTopLoader from "nextjs-toploader";

//use geistsans font

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <NextTopLoader
          color="#025963"
          initialPosition={0.08}
          crawlSpeed={200}
          height={5}
          crawl={true}
          showSpinner={true}
          easing="ease"
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        <QueryProvider>{children}</QueryProvider>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
