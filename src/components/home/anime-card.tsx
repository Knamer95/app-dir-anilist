import Image from "next/image";
import Link from "next/link";

import { type Anime } from "@/anilist-api/anime/client";
import { getAnimeURL, getUserConfig } from "@/utils";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { getAnimeTitle } from "./logic";

type AnimeCardProps = {
  anime: Anime;
};

export const AnimeCard = (props: AnimeCardProps) => {
  const { anime } = props;
  const { displayAnimeLanguage } = getUserConfig();

  const formattedTitle = getAnimeTitle(anime.title, displayAnimeLanguage);
  const animeGenres = anime.genres ?? [];
  const DISPLAY_BADGE_AMOUNT = 2;

  return (
    <Card className="relative h-[350px] w-[250px] overflow-hidden [&:has(:hover)_.anime-cover-image]:brightness-[0.6]">
      <Link
        className="relative flex h-full items-end"
        href={getAnimeURL(anime)}
      >
        <Image
          src={anime.coverImage.large}
          alt={`${formattedTitle} cover`}
          className="anime-cover-image h-auto w-auto object-cover brightness-[1] transition duration-300 hover:brightness-[0.6]"
          fill
        />
        <CardContent className="relative z-10 basis-full bg-slate-800/60 px-3 py-2.5">
          <div className="flex items-start gap-3">
            <p
              className="line-clamp-1 flex-1 text-white"
              title={formattedTitle ?? undefined}
            >
              {formattedTitle}
            </p>
            <p className="self-end text-xs text-slate-300">
              {anime.meanScore / 10} / 10
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {animeGenres.slice(0, 2).map((g, index) => (
              <Badge key={index} className="px-1 py-0.5 hover:bg-primary/100">
                {g}
              </Badge>
            ))}
            {animeGenres.length > DISPLAY_BADGE_AMOUNT ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge variant="secondary">
                      + {animeGenres.length - DISPLAY_BADGE_AMOUNT}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    {animeGenres.slice(DISPLAY_BADGE_AMOUNT).join(", ")}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <></>
            )}
          </div>
          {/* <p className="mt-3 line-clamp-2 text-sm text-slate-300">
            {anime.description}
          </p> */}
        </CardContent>
      </Link>
    </Card>
  );
};
