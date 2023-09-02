import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { Input } from "@/components/ui/input";
import "./globals.css";

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
          <div className="flex items-center gap-x-2 bg-slate-900 p-3">
            <p>Logo</p>
            <Input className="w-64 flex-initial" />
            <div className="flex-initial">
              <ModeToggle />
            </div>
          </div>

          <div className="content m-3">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
