import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./_components/Nav/Nav";
import Fotter from "./_components/Fotter/Fotter";
import toast, { Toaster } from 'react-hot-toast';
import { SessionProvider } from "next-auth/react";
import NextAuthProvidor from "./providors/nextAuthProvidor";
import Providers from "./providors/reactQuaryProvidor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Freshcart",
  description: "an E-commerce website",
};


export default function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <NextAuthProvidor>
            <Nav/>
            {children}
            <Toaster />
            <Fotter/>
          </NextAuthProvidor>
        </Providers>


      </body>
    </html>
  );
}
