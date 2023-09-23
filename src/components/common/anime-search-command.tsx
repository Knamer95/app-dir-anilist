import { useRef, useState } from "react";
import { Loader } from "@mantine/core";
import { useDebounce } from "@uidotdev/usehooks";
import Image from "next/image";
import Link from "next/link";

import { getAnimeResults } from "@/app/actions";
import { useFetch } from "@/hooks";
import { getAnimeURL, getUserConfig } from "@/utils";
import { getAnimeTitle } from "../home/logic";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

type AnimeSearchCommandProps = {
  open: boolean;
  onOpen: (openState: boolean) => void;
};

export const AnimeSearchCommand = (props: AnimeSearchCommandProps) => {
  const { open, onOpen } = props;
  const { displayAnimeLanguage } = getUserConfig();

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);

  const listRef = useRef<HTMLDivElement | null>(null);

  const {
    loading,
    data: animeList,
    hasMore,
    setLoading,
  } = useFetch({
    query: getAnimeResults,
    queryData: {
      page: 1,
      search: debouncedQuery,
    },
    deps: [debouncedQuery],
    onSuccess: () => listRef.current?.scrollTo({ top: 0 }),
  });

  return (
    // <form ref={formRef} action={search}>
    <CommandDialog
      open={open}
      onOpenChange={(state) => {
        onOpen(state);
        setSearchQuery("");
      }}
      shouldFilter={false}
    >
      <CommandInput
        placeholder="Search for anime and manga..."
        value={searchQuery}
        onValueChange={(q) => {
          setSearchQuery(q);
          setLoading(true);
        }}
      />
      <CommandList ref={listRef}>
        {debouncedQuery && (
          <>
            {loading && (
              <CommandEmpty>
                {/* TODO-mk - Check why it does not include styles, it shows a circle but the color for the loader isn't set */}
                <Loader />
              </CommandEmpty>
            )}

            {!loading && <CommandEmpty>No results found.</CommandEmpty>}

            {!loading && animeList.length > 0 && (
              <CommandGroup heading="Search">
                {animeList?.map((anime) => {
                  const formattedTitle = getAnimeTitle(
                    anime.title,
                    displayAnimeLanguage,
                  );

                  return (
                    <Link
                      key={anime.id}
                      href={getAnimeURL(anime)}
                      onClick={() => {
                        onOpen(false);
                      }}
                    >
                      <CommandItem className="group rounded-lg">
                        <div className="flex w-full gap-3 bg-transparent">
                          <div className="min-w-12 max-w-12 relative aspect-square h-12 w-12 overflow-hidden">
                            <Image
                              src={anime.coverImage.large}
                              alt={`${formattedTitle} cover`}
                              className="anime-cover-image object-cover brightness-[1] transition duration-300 hover:brightness-[0.6]"
                              // height={200}
                              // width={50}
                              fill
                            />
                          </div>
                          <div>
                            <p className="group-hover:underline">
                              {anime.title.romaji}
                            </p>
                            <div className="flex gap-1">
                              <p className="group-hover:underline">
                                {anime.seasonYear ?? "??"}
                              </p>
                              <p className="capitalize group-hover:underline">
                                {anime.type?.toLowerCase()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CommandItem>
                    </Link>
                  );
                })}
              </CommandGroup>
            )}
            {!loading && hasMore && (
              <CommandItem>
                <p className="pl-2">View all results</p>
              </CommandItem>
            )}
          </>
        )}

        {!debouncedQuery && (
          <CommandGroup heading="Recent">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
    // </form>
  );
};
