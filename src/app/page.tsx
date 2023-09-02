import { getAnime } from "@/api/getAnime";
import { AnimeCard } from "@/components/home/anime-card";

const Home = async () => {
  // TODO-mk - Use query params for pagination/search
  const res = await getAnime(1);

  const animeList = res?.Page?.media ?? [];
  return (
    <main>
      <div className="flex flex-wrap gap-3">
        {animeList?.map((a) => <AnimeCard key={a.id} anime={a} />)}
      </div>
    </main>
  );
};

export default Home;
