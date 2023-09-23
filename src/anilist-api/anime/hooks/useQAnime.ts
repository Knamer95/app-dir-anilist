import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { type GetGQLPayload } from "@/anilist-api";
import type { AnimeQuery, Anime } from "../types";
import { QUERY_GET_ANIME } from "../const";

export const useQAnime = (data: GetGQLPayload) => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);

  const result = useQuery<AnimeQuery>(QUERY_GET_ANIME, { variables: data });

  useEffect(() => {
    if (result.loading) return;
    setAnimeList(result.data?.Page?.media ?? []);
  }, [result]);

  return { ...result, data: animeList };
};
