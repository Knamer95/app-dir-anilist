import { gql } from "@apollo/client";

import { getClient } from "@/lib/client";
import { AnimeQuery } from "./types";

// TODO-mk - Change cache options, articles/docs for reference:
// https://nextjs.org/docs/app/building-your-application/caching
// https://www.apollographql.com/blog/apollo-client/next-js/how-to-use-apollo-client-with-next-js-13/
export const getAnime = async (page: number, search?: string) => {
  const variables = {
    page,
    ...(search && { search }),
  };

  const query = gql`
    query ($page: Int, $search: String) {
      Page(page: $page, perPage: 10) {
        pageInfo {
          total
          currentPage
          lastPage
        }
        media(type: ANIME, search: $search) {
          id
          title {
            romaji
            english
            native
          }
          genres
          episodes
          coverImage {
            large
            color
          }
          meanScore
          description
        }
      }
    }
  `;

  const res = await getClient().query<AnimeQuery>({ query, variables });
  return res.data;
};
