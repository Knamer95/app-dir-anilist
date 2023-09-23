import { type Anime } from "@/anilist-api/anime/client";

export const getAnimeURL = (anime: Anime) =>
  `/anime/${anime.id}/${anime.title.romaji?.replace(/\s/g, "-")}`;
