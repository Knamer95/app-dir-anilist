import { getAnimeURL } from "@/utils";
import { redirect } from "next/dist/server/api-utils";

const AnimeProfile = () => {
  // TODO-mk - If the URL does not contain the anime name (:id/:animeName), replace it
  // redirect(getAnimeURL(anime));
  return <>Hey</>;
};

export default AnimeProfile;
