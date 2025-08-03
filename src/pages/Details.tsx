import { BsFillPlayFill, BsStarFill } from "react-icons/bs";
import { FiCalendar, FiClock, FiGlobe, FiDollarSign } from "react-icons/fi";
import Header from "@/components/Header";
import { useDetails } from "@/hooks/useDetails";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { Skeleton } from "../components/ui/skeleton";
import { motion } from "framer-motion";
import { MovieDetails, TVDetails } from "@/types/types";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const Details = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const type = pathname.includes("/tv") ? "tv" : "movie";

  // Use correct generic for useDetails hook
  const { details, loading } = useDetails<MovieDetails | TVDetails>(`/${type}/${movieId}`);

  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [episodeCount, setEpisodeCount] = useState<number>(0);
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
  const [isBackdropLoaded, setIsBackdropLoaded] = useState(false);

  // Type guard to check if details is TVDetails
  const isTVDetails = (details: MovieDetails | TVDetails): details is TVDetails => {
    // Check if the details object has properties specific to TV shows
    return 'name' in details && 'first_air_date' in details;
  };

  // Safe runtime formatting
  const runtime = useMemo(() => {
    if (!details) return "N/A";
    
    if (isTVDetails(details) && details.episode_run_time && details.episode_run_time.length > 0) {
      const epRuntime = details.episode_run_time[0];
      const hours = Math.floor(epRuntime / 60);
      const minutes = epRuntime % 60;
      return `${hours}h ${minutes}m`;
    }
    
    if (!isTVDetails(details) && details.runtime) {
      const hours = Math.floor(details.runtime / 60);
      const minutes = details.runtime % 60;
      return `${hours}h ${minutes}m`;
    }
    
    return "N/A";
  }, [details, type]);

  // Safe revenue formatting
  const revenue = useMemo(() => {
    if (!details || isTVDetails(details)) return "N/A";
    
    if (details.revenue !== undefined && details.revenue !== null) {
      // Check if revenue is 0 or less, as it might appear for some items.
      if (details.revenue <= 0) return "N/A";

      // Convert to billions for formatting.
      const revenueInBillions = details.revenue / 1_000_000_000;

      return (
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 1,
          maximumFractionDigits: 1, // Only one decimal place for billions
        }).format(revenueInBillions) + "B"
      );
    }
    return "N/A";
  }, [details]);

  // Language mapping safely
  const language = useMemo(() => {
    if (!details?.original_language) return "N/A";
    const langMap: Record<string, string> = {
      en: "English",
      es: "Spanish",
      fr: "French",
      de: "German",
      ja: "Japanese",
      ko: "Korean",
      zh: "Chinese",
      hi: "Hindi",
      // Add more language mappings as needed
    };
    return langMap[details.original_language] || details.original_language?.toUpperCase() || "N/A";
  }, [details]);

  // Update episode count when season changes
  useEffect(() => {
    if (selectedSeason !== null && details && isTVDetails(details) && details.seasons) {
      const season = details.seasons.find(
        (s) => s.season_number === selectedSeason
      );
      setEpisodeCount(season?.episode_count ?? 0);
      setSelectedEpisode(null); // Reset selected episode when season changes
    }
  }, [selectedSeason, details, type]);

  // Auto select first valid season if none selected (TV shows)
  useEffect(() => {
    if (type === "tv" && details && isTVDetails(details) && details.seasons?.length && selectedSeason === null) {
      // Find the first season that is not "Specials" (season_number 0 typically)
      // and has episodes
      const firstValidSeason = details.seasons.find(
        (season) => season.season_number > 0 && (season.episode_count ?? 0) > 0
      );
      setSelectedSeason(firstValidSeason?.season_number ?? null);
    }
  }, [details, type, selectedSeason]);

  // Loading state UI
  if (loading || !details) {
    return (
      <>
        <Header extraClasses="border-b-0" />
        <div className="pt-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <Skeleton className="w-[230px] h-[360px] rounded-xl" />
                  <div className="flex-1 space-y-4">
                    <Skeleton className="h-10 w-3/4 rounded-lg" />
                    <Skeleton className="h-4 w-full rounded-lg" />
                    <Skeleton className="h-4 w-5/6 rounded-lg" />
                    <Skeleton className="h-4 w-4/6 rounded-lg" />
                    <div className="flex gap-2 flex-wrap">
                      {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-8 w-20 rounded-full" />
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-1/2 rounded-lg" />
                      <Skeleton className="h-4 w-1/3 rounded-lg" />
                      <Skeleton className="h-4 w-1/4 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-4">
                <Skeleton className="h-8 w-1/2 mb-4 rounded-lg" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-8 w-16 rounded-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Main render
  return (
    <>
      <Header extraClasses="border-b-0" />

      {/* Backdrop Image and Overlay */}
      <motion.div
        className="relative"
        initial="hidden"
        animate={isBackdropLoaded ? "visible" : "hidden"}
        variants={fadeIn}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10" />
        {details.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
            alt={details ? (isTVDetails(details) ? details.name || "" : details.original_title || "") : ""}
            className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] object-cover object-center"
            loading="eager"
            onLoad={() => setIsBackdropLoaded(true)}
          />
        ) : (
          <div className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] bg-gradient-to-br from-gray-900 to-gray-800" />
        )}
      </motion.div>

      {/* Main Content Section */}
      <motion.div
        className="relative z-20 -mt-24 md:-mt-32 lg:-mt-60"
        initial="hidden"
        animate="visible"
        variants={slideUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
          <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Poster and Details */}
            <div className="md:col-span-12 flex flex-col md:flex-row gap-8">
              {/* Poster */}
              <motion.div
                className="flex-shrink-0 mx-auto md:mx-0 w-[250px] md:w-[230px] lg:w-[250px]"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {details.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                    alt={details ? (isTVDetails(details) ? details.name || "" : details.original_title || "") : ""}
                    className="w-full h-auto rounded-xl shadow-2xl object-cover border-2 border-white/10 hover:border-white/20 transition-all duration-300"
                  />
                ) : (
                  <div className="w-full h-[375px] rounded-xl bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center border border-gray-700">
                    <span className="text-gray-400 text-center p-4">
                      No poster available
                    </span>
                  </div>
                )}
              </motion.div>

              {/* Details */}
              <div className="flex-1 text-center md:text-left pt-4">
                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {details ? (isTVDetails(details) ? details.name || "" : details.original_title || "") : ""}
                </motion.h1>

                {/* Rating */}
                {details.vote_average !== undefined && details.vote_average !== null && (
                  <motion.div
                    className="flex justify-center md:justify-start items-center mb-4 md:mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/30">
                      <BsStarFill className="text-yellow-400 mr-2" />
                      <span className="text-white font-medium">
                        {details.vote_average.toFixed(1)}/10
                      </span>
                    </div>
                  </motion.div>
                )}

                <motion.p
                  className="text-gray-300 mb-6 md:mb-8 text-base md:text-lg leading-relaxed w-[60vw] mx-auto md:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {details.overview || "No overview available."}
                </motion.p>

                {/* Genres */}
                <motion.div
                  className="flex flex-wrap justify-center md:justify-start gap-3 mb-6 md:mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {details.genres?.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-4 py-2 bg-white/5 text-white rounded-full text-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                    >
                      {genre.name}
                    </span>
                  ))}
                </motion.div>

                {/* Metadata */}
                <motion.div
                  className="space-y-3 text-gray-300 text-center md:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center justify-center md:justify-start">
                    <FiCalendar className="mr-2 text-white/70" />
                    <span className="font-medium">Release Date: </span>
                    <span className="ml-1">
                      {details ? (isTVDetails(details) ? details.first_air_date || "N/A" : details.release_date || "N/A") : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <FiClock className="mr-2 text-white/70" />
                    <span className="font-medium">Runtime: </span>
                    <span className="ml-1">{runtime}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <FiGlobe className="mr-2 text-white/70" />
                    <span className="font-medium">Language: </span>
                    <span className="ml-1">{language}</span>
                  </div>
                  {!isTVDetails(details) && details.revenue !== undefined && details.revenue !== null && details.revenue > 0 && (
                    <div className="flex items-center justify-center md:justify-start">
                      <FiDollarSign className="mr-2 text-white/70" />
                      <span className="font-medium">Revenue: </span>
                      <span className="ml-1">{revenue}</span>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Right Column: Seasons/Episodes (TV only) */}
            {type === "tv" && isTVDetails(details) && details.seasons && (
              <motion.div
                className="md:col-span-4 mt-8 md:mt-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 text-center md:text-left">
                  Seasons & Episodes
                </h2>

                {/* Seasons */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-300 mb-3 text-center md:text-left">
                    Select Season
                  </h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    {details.seasons
                      ?.filter(s => (s.episode_count ?? 0) > 0) // Filter out seasons with 0 episodes
                      .map((season) => (
                        <motion.button
                          key={season.season_number}
                          onClick={() => setSelectedSeason(season.season_number)}
                          className={`px-4 py-2 rounded-xl transition-all font-medium whitespace-nowrap ${
                            selectedSeason === season.season_number
                              ? "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg border-transparent"
                              : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-pressed={selectedSeason === season.season_number}
                        >
                          {season.name}
                        </motion.button>
                      ))}
                  </div>
                </div>

                {/* Episodes */}
                {selectedSeason !== null && episodeCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-300 mb-3 text-center md:text-left">
                      Select Episode
                    </h3>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 max-h-64 overflow-y-auto custom-scrollbar pr-2">
                      {Array.from({ length: episodeCount }, (_, i) => i + 1).map(
                        (episodeNum) => (
                          <motion.button
                            key={episodeNum}
                            onClick={() => setSelectedEpisode(episodeNum)}
                            className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all font-medium ${
                              selectedEpisode === episodeNum
                                ? "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg border-transparent"
                                : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-pressed={selectedEpisode === episodeNum}
                          >
                            {episodeNum}
                          </motion.button>
                        )
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              onClick={() => {
                const title = details ? (isTVDetails(details) ? details.name : details.original_title) : "";
                if (title) {
                  // Corrected Youtube URL for better accuracy
                  window.open(
                    `https://www.youtube.com/results?search_query=${encodeURIComponent(title + " trailer")}`,
                    "_blank"
                  );
                }
              }}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold flex items-center justify-center gap-3 transition-all border border-white/10 hover:border-white/20"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <BsFillPlayFill size={24} />
              <span>Watch Trailer</span>
            </motion.button>
            <motion.button
              onClick={() => {
                if (
                  type === "tv" &&
                  selectedSeason !== null &&
                  selectedEpisode !== null
                ) {
                  navigate(
                    `/player/${movieId}?season=${selectedSeason}&episode=${selectedEpisode}`
                  );
                } else if (details.id) {
                  navigate(`/player/${details.id}`);
                }
              }}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-xl font-semibold flex items-center justify-center gap-3 transition-all shadow-lg"
              disabled={type === "tv" && (selectedSeason === null || selectedEpisode === null)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <BsFillPlayFill size={24} />
              <span>Watch Now</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Details;
