import type { Metadata } from "next";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import "@mantine/core/styles.css";
import { Inter } from "next/font/google";

import { AnimeSearchInput } from "@/components/common/anime-search-input";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollArea } from "@/components/ui/scroll-area";
import "./globals.css";
import Link from "next/link";

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
      <head>
        <ColorSchemeScript />
      </head>

      <body className={inter.className}>
        <MantineProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <header className="flex items-center gap-x-2 bg-slate-900 p-3 px-8">
              <div className="grow">
                <p className="w-fit cursor-pointer text-lg font-semibold">
                  <Link href="/">Anime-R</Link>
                </p>
              </div>
              <div className="flex items-center justify-items-end gap-4">
                <AnimeSearchInput />
                <div className="flex-initial">
                  <ModeToggle />
                </div>
              </div>
            </header>

            <div className="m-2">
              {/* Using a ref for the navbar height would require client component, so we use a fixed number */}
              <ScrollArea className="relative h-[calc(100vh-60px-1rem)] w-full overflow-auto">
                <div className="content m-6 p-4">{children}</div>
              </ScrollArea>
            </div>
          </ThemeProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
