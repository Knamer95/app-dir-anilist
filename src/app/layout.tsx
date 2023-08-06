import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Input } from "@/components/ui/input";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "App dir with AniList",
  description: "I don't know what I'm doing",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex gap-x-2 p-3 bg-slate-900 items-center">
            <p>Logo</p>
            <Input className="flex-initial w-64" />
            <div className="flex-initial">
              <ModeToggle />
            </div>
          </div>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
