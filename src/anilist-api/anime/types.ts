export type GetAnimePayload = {
  perPage?: number;
  page: number;
  search?: string;
};

export type AnimeLanguage = "romaji" | "english" | "native";

export type AnimeQuery = {
  Page: {
    pageInfo: {
      total: number;
      currentPage: number;
      lastPage: number;
    };
    media: Anime[];
  };
};

export type Anime = {
  id: number;
  title: Record<AnimeLanguage, string | null>;
  season: string;
  seasonYear: number;
  type: string;
  genres: string[] | null;
  episodes: number;
  coverImage: {
    large: string;
    color: string | null;
  };
  meanScore: number;
  description: string | null;
};
