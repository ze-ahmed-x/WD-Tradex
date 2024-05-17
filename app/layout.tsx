import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/header/Navbar";
import Footer from "@/components/shared/footer/Footer";
import { Toaster } from "@/components/ui/toaster"

const poppins = Poppins({ subsets: ["latin"],
weight: ["100", "200", "300", "400", "500", "600","700", "800", "900"]});

export const metadata: Metadata = {
  title: "Tradex",
  description: "Overseas Employment of Pakistanis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
      <Toaster />
      <Navbar />
        {children}
      <Footer />
        </body>
    </html>
  );
}
