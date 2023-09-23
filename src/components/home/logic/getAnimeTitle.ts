import { type Anime, type AnimeLanguage } from "@/anilist-api/anime/client";

const fallbackLanguage: AnimeLanguage = "native";

/**
 * @description Returns an anime title in the specified language
 *
 * @param title Object with the anime titles
 * @param displayAnimeLanguage Chosen language
 * @returns Title in the specified language, or the fallback language if the specified one was unavailable
 */
export const getAnimeTitle = (
  title: Anime["title"],
  displayAnimeLanguage: AnimeLanguage,
) => {
  return title[displayAnimeLanguage] ?? title[fallbackLanguage];
};
