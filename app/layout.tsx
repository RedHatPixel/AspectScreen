import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--oswald",
  subsets: ["latin"],
  weight: ["400"]
});

export const metadata: Metadata = {
  title: "AspectScreen",
  description: "Your free movies, tv and films streaming website.",
};

export default function RootLayout({ children }: Readonly <{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
