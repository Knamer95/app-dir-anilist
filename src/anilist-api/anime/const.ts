import { gql } from "@apollo/client";

export const QUERY_GET_ANIME = gql`
  query ($page: Int, $search: String, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
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
        season
        seasonYear
        type
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
