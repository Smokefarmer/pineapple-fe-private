import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@rainbow-me/rainbowkit/styles.css"; // Import RainbowKit styles
import "./globals.css";
import { Providers } from "./providers"; // Import the Providers component
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EVM Token Launcher",
  description: "Launch your EVM token easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background`}>
        <Providers> {/* Wrap the content with Providers */}
            {children}
            <Toaster/> 
        </Providers>
      </body>
    </html>
  );
}