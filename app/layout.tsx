import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import { MainNav } from "@/components/navbar";
import { PenLine } from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Providers from "./providers";

const queryClient = new QueryClient();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mindscribe",
  description:
    "Mindscribe – Effortless journaling to capture your thoughts, organize ideas, and unleash creativity with ease.",
  icons: "favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <header className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <PenLine className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Mindscribe</span>
              </div>
              <MainNav />
            </header>
            {children}

            <Analytics />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
