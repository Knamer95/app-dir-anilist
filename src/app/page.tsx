import { getAnime } from "@/anilist-api/anime/server";
import { AnimeCard } from "@/components/home/anime-card";

const Home = async () => {
  // TODO-mk - Use query params for pagination/search
  const res = await getAnime({ page: 1 });

  const animeList = res?.Page?.media ?? [];

  return (
    <main>
      <div className="flex flex-wrap justify-center gap-6">
        {animeList?.map((a) => <AnimeCard key={a.id} anime={a} />)}
      </div>
    </main>
  );
};

export default Home;
