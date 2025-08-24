import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: "Sign In - Zephyra Tech Task",
  description: "Create by Chanuka Nadun using next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col">
       
        <main className="flex-1 container mx-auto">{children}</main>
        
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
