import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GreenTrack AI | Enterprise Sustainability & Emissions Tracking",
  description: "AI-driven Scope 1-3 carbon footprint, energy, and waste tracking for Indian enterprises. CSRD compliant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className={`${inter.className} min-h-screen bg-black text-white flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
