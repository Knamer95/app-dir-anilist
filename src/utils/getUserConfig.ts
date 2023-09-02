import { AnimeLanguage } from "@/api/types";

type UserConfig = {
  displayAnimeLanguage: AnimeLanguage;
};

// If we want to use localStorage or client side functionalities, the component that uses this function will require 'use client'
// In that case, this might become a hook instead

// Using a database for this might be overkill, but also an excuse to use SQLite with same origin fetches
export const getUserConfig = () => {
  // TODO-mk - Get user config from the server (cookies/database), or client (localStorage)

  const config: UserConfig = {
    displayAnimeLanguage: "english",
  };

  return config;
};
