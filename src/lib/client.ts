import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ANILIST_URI } from "./const";

export const client = new ApolloClient({
  uri: ANILIST_URI,
  cache: new InMemoryCache(),
});
