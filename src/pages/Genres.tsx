import Header from "@/components/Header";
// import Sidebar from "@/components/Sidebar";
import { useGenre } from "@/hooks/useGenre";

const Genres = () => {
  const { apiList } = useGenre("/genre/movie/list");
  console.log(apiList);
  return (
    <>
      {/* <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"> */}
      {/* <Sidebar /> */}
      <Header />
      <div className="flex flex-col md:px-10 px-4">
        <main className="m-4">
          <h1 className="text-2xl font-semibold">Genres</h1>
          <ul className="grid xl:grid-cols-5 grid-cols-2 gap-8 mt-4">
            {apiList?.map((genre) => (
              <li
                key={genre.id}
                className="md:w-[200px] w-full border py-4 px-6 rounded-lg"
              >
                {genre.name}
              </li>
            ))}
          </ul>
        </main>
      </div>
      {/* </div> */}
    </>
  );
};

export default Genres;
