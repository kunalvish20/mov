import { useLocation, useParams, useSearchParams } from "react-router-dom";

const Player = () => {
  const { playerId } = useParams();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const season = searchParams.get("season");
  const episode = searchParams.get("episode");

  console.log(`https://vidsrc.xyz/embed/tv/${playerId}/${season}-${episode}`);
  const movieUrl =
    season && episode
      ? `https://vidsrc.xyz/embed/tv/${playerId}/${season}-${episode}`
      : `https://vidsrc.xyz/embed/${
          pathname.includes("/tv") ? "tv" : "movie"
        }/${playerId}`;

  return (
    <div>
      <iframe
        src={movieUrl}
        className="w-full h-screen"
        allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Player;
