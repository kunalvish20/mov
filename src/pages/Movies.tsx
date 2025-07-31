import Header from "@/components/Header";
import Main from "@/components/Main";
import { GenreContext } from "@/context/Genre";
import { useContext } from "react";
import { useParams } from "react-router-dom";

const Movies = () => {
  const { genre } = useParams();
  const { genres } = useContext(GenreContext);
  return (
    <div>
      <Header />
      {genre ? (
        <Main
          sectionTitle={"Movies : " + genre}
          url={`/discover/movie`}
          genreId={genres !== null ? genres : undefined}
          start={0}
        />
      ) : (
        <Main
          sectionTitle={"Movies"}
          url={`/discover/movie`}
          genreId={genres !== null ? genres : undefined}
          start={0}
        />
      )}
    </div>
  );
};

export default Movies;
