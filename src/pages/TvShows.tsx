import Header from "@/components/Header";
import Main from "@/components/Main";

const TvShows = () => {
  return (
    <>
      <Header />
      <Main sectionTitle="Tv Shows" url={"/discover/tv"} start={0} />
    </>
  );
};

export default TvShows;
