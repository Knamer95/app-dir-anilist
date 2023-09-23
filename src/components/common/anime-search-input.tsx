"use client";

import { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { z } from "zod";

import { AnimeSearchCommand } from "./anime-search-command";
import { client } from "@/lib/client";

const _searchSchema = z.object({
  query: z.string(),
  limit: z.coerce.number(),
  type: z.enum([""]),
});

export const AnimeSearchInput = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <ApolloProvider client={client}>
      <MagnifyingGlassIcon
        className="h-6 w-6 cursor-pointer"
        onClick={() => setOpen(true)}
      />
      <AnimeSearchCommand open={open} onOpen={setOpen} />
    </ApolloProvider>
  );
};
