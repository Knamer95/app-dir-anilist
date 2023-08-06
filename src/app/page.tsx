import { getAnime } from "@/api/getAnime";

const Home = async () => {
  // TODO-mk - Use query params for pagination/search
  const res = await getAnime(1);
  console.log(res);

  return <main>Hello world</main>;
};

export default Home;
