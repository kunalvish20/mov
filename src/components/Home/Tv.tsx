import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "@/hooks/UseFetch";
import { Skeleton } from "../ui/skeleton";

// Updated TV show interface
interface TVShow {
  id: number;
  name: string;
  poster_path: string | null;
  vote_average?: number;
  overview?: string;
}

const Tv = () => {
  const navigate = useNavigate();
  const { apiList, loading } = useFetch("/tv/popular");

  return (
    <section className="py-10 px-4 sm:px-8 lg:px-16 xl:px-20 bg-gradient-to-b from-[#400000] to-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-2xl md:text-3xl text-white">
            Popular TV Shows
          </h2>
          <Link 
            to="/tv-series" 
            className="text-sm md:text-base text-red-400 hover:text-red-300 transition-colors duration-300 font-medium"
          >
            View All →
          </Link>
        </div>

        {/* Carousel */}
        <Carousel className="relative group">
          {loading ? (
            <CarouselContent>
              {[...Array(6)].map((_, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                >
                  <div className="p-1">
                    <Card className="bg-transparent shadow-none rounded-lg">
                      <CardContent className="p-0">
                        <Skeleton className="w-full h-[250px] md:h-[280px] rounded-lg bg-gray-800" />
                        <Skeleton className="w-3/4 h-4 mt-2 bg-gray-800" />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          ) : (
            <>
              <CarouselContent>
                {apiList.map((show) => (
                  <CarouselItem
                    key={show.id}
                    className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                  >
                    <div className="p-1">
                      <Card 
                        onClick={() => navigate(`/tv-info/${show.id}`)}
                        className="cursor-pointer bg-transparent shadow-none overflow-hidden rounded-lg transition-all duration-300 hover:scale-105"
                      >
                        <CardContent className="relative p-0">
                          <div className="relative overflow-hidden rounded-lg">
                            <img
                              src={
                                show.poster_path
                                  ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                                  : "/fallback-image.jpg"
                              }
                              alt={show.name}
                              className="w-full h-[250px] md:h-[280px] object-cover transition-transform duration-500 hover:scale-110"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                              <h3 className="text-white font-bold text-sm md:text-base truncate">
                                {show.name}
                              </h3>
                              {show.vote_average !== undefined && (
                                <div className="flex items-center mt-1">
                                  <span className="text-yellow-400 text-xs md:text-sm font-medium">
                                    ★ {show.vote_average.toFixed(1)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 text-white border-none shadow-lg hover:scale-110 transition-all duration-300" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 text-white border-none shadow-lg hover:scale-110 transition-all duration-300" />
            </>
          )}
        </Carousel>
      </div>
    </section>
  );
};

export default Tv;
