import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "100"
});

export const metadata: Metadata = {
  title: "AspectScreen",
  description: "Your free movies, tv and films streaming website.",
};

export default function RootLayout({ children }: Readonly <{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
