import { getClient } from "@/lib/client";
import { QUERY_GET_ANIME } from "../const";
import type { AnimeQuery } from "../types";
import { type GetGQLPayload } from "@/anilist-api";

// TODO-mk - Change cache options, articles/docs for reference:
// https://nextjs.org/docs/app/building-your-application/caching
// https://www.apollographql.com/blog/apollo-client/next-js/how-to-use-apollo-client-with-next-js-13/
export const getAnime = async (data: GetGQLPayload) => {
  const res = await getClient().query<AnimeQuery>({
    query: QUERY_GET_ANIME,
    variables: {
      perPage: 24,
      ...data,
    },
  });
  return res.data;
};
