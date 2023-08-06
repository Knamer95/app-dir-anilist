export const getAnime = async (page: number, search?: string) => {
  const variables = {
    page,
    ...(search && { search }),
  };

  const query = `
    query ($page: Int, $search: String) {
      Page (page: $page, perPage: 10) {
        pageInfo {
          total
          currentPage
          lastPage
        }
        media (type: ANIME, search: $search) {
          id
          title {
            romaji
            english
            native
          }
        }
      }
    }
  `;

  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  return res.json();
};
