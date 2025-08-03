import { BiSearch } from "react-icons/bi";
import imdb from "@/assets/imdb.svg";
import { useFetch } from "@/hooks/UseFetch";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSearch } from "@/context/Search";
import { CommonListItemProperties } from "@/types/types";

interface HeroCarouselItem extends CommonListItemProperties {
  title?: string;
  name?: string;
  overview?: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average?: number;
  vote_count?: number | null;
  release_date?: string | null;
  first_air_date?: string | null;
  media_type?: 'movie' | 'tv' | 'person';
}

type Props = {
  url: string;
};

const HeroSection: React.FC<Props> = ({ url }) => {
  const { apiList } = useFetch<HeroCarouselItem>(url);
  const searchRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const { searchQuery = "", setSearchQuery } = useSearch();
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if ((searchQuery ?? "").trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery ?? "")}`);
      console.log("Searching for:", searchQuery);
    }
  };

  const handleSearchPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="absolute dark:text-white light:text-white z-10 w-full top-[18%] left-1/2 flex justify-center translate-x-[-50%] translate-y-[-50%]">
        <div className="flex flex-col gap-2 justify-center items-center">
          <h2 className="text-3xl font-bold">Blink Search</h2>
          <div className="searchBox">
            <input
              className="searchInput"
              type="text"
              name="search"
              value={searchQuery || ""}
              onChange={handleSearchInputChange}
              placeholder="search movies/tv-shows/genres..."
              onKeyUp={handleSearchPress}
              aria-label="Search movies or TV shows"
            />
            <button
              type="submit"
              title="Search"
              ref={searchRef}
              className="searchButton"
              onClick={handleSearch}
              aria-label="Submit search"
            >
              <BiSearch className="w-7 h-7 translate-x-1" />
            </button>
          </div>
        </div>
      </div>
      <Carousel
        plugins={[plugin.current]}
        onMouseLeave={plugin.current.reset}
        className="p-0 m-0"
      >
        <CarouselContent>
          {apiList.map((item) => (
            <CarouselItem key={item.id} className="p-0 m-0 border-0">
              <div>
                <Card className="border-none">
                  <CardContent className="flex md:h-screen h-[96vh] w-full p-0 text-white items-center justify-center relative">
                    <div className="bg-black/30 absolute inset-0"></div>
                    <div className="absolute inset-0 dark:bg-gradient-to-t from-background via-transparent to-background"></div>
                    <div className="absolute inset-0 dark:bg-gradient-to-r from-background to-transparent"></div>
                    <div className="absolute md:left-20 left-10 md:bottom-[30%] bottom-[26%] md:w-[70%] w-[80%]">
                      <h1 className="font-black md:text-7xl text-4xl py-6">
                        {item.title || item.name || "Untitled"}
                      </h1>
                      <p className="max-w-2xl">
                        {item.overview && item.overview.length > 160 ? (
                          <>
                            {item.overview.slice(0, 160)}...
                            <span
                              className="text-pink-500 cursor-pointer"
                              onClick={() => navigate(`/movie-info/${item.id}`)}
                            >
                              {" "}
                              show more
                            </span>
                          </>
                        ) : (
                          item.overview || "No overview available."
                        )}
                      </p>
                      <div className="py-2 flex items-center gap-2">
                        <img src={imdb} alt="imdb logo" className="w-10 h-10" />
                        {item.vote_average?.toFixed(1) || "N/A"} ({item.vote_count || 0})
                        <div>
                          <p>{item.release_date || item.first_air_date || "N/A"}</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Button
                          variant={"outline"}
                          className="bg-black"
                          onClick={() => {
                            const mediaTitle = item.title || item.name;
                            if (mediaTitle) {
                              window.open(
                                `https://www.youtube.com/results?search_query=${encodeURIComponent(mediaTitle + " trailer")}`,
                                "_blank"
                              );
                            }
                          }}
                        >
                          Watch Trailer
                        </Button>
                        <Button
                          className="bg-pink-700 text-white flex gap-1 items-center"
                          onClick={() => navigate(`/movie-info/${item.id}`)}
                        >
                          Watch Now
                        </Button>
                      </div>
                    </div>
                    <img
                      src={
                        item.backdrop_path
                          ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
                          : "https://via.placeholder.com/1920x1080?text=No+Image"
                      }
                      alt={item.title || item.name || "Media Backdrop"}
                      className="w-full md:object-fill object-cover h-full"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/1920x1080?text=No+Image";
                      }}
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex absolute bottom-2 my-3 md:ms-auto md:mx-0 md:w-fit w-full mx-auto md:right-4 z-10">
        <Carousel className="md:max-w-4xl sm:max-w-sm max-w-[300px] md:ms-auto mx-auto">
          <CarouselContent className="pt-10">
            {apiList.map((item) => (
              <CarouselItem
                key={item.id}
                className="md:basis-1/5 basis-1/3 hover:scale-105 z-30 duration-300 ease-in-out"
              >
                <div className="p-1">
                  <Card
                    onClick={() => navigate(`/movie-info/${item.id}`)}
                    className="cursor-pointer rounded-lg overflow-hidden shadow-lg"
                  >
                    <CardContent className="flex aspect-auto items-center justify-center p-0">
                      <span>
                        <img
                          src={
                            item.poster_path
                              ? `https://image.tmdb.org/t/p/original${item.poster_path}`
                              : "https://via.placeholder.com/500x750?text=No+Poster"
                          }
                          alt={item.title || item.name || "Media Poster"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/500x750?text=No+Poster";
                          }}
                        />
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};

export default HeroSection;




