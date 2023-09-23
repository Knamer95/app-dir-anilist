"use server";

import { type GetGQLPayload } from "@/anilist-api";
import { getAnime } from "@/anilist-api/anime/server";

export type AnimeResults = ReturnType<typeof getAnimeResults>;

export const getAnimeResults = async (data: GetGQLPayload) => {
  const result = await getAnime({
    perPage: 5,
    ...data,
  });

  return {
    data: result.Page?.media ?? [],
    hasMore: result.Page.pageInfo.lastPage > data.page,
  };
};
