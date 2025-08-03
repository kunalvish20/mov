// src/types.ts

// --- Core API Structures ---

/**
 * Generic interface for paginated API responses (e.g., from /popular, /trending endpoints).
 * T represents the type of individual item in the 'results' array.
 */
export interface PaginatedApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// --- Shared Base Interfaces for Media (Movies & TV Shows) ---

/**
 * Common properties found on both movie and TV show objects,
 * especially useful for list items where data is concise.
 */
export interface CommonListItemProperties {
  id: number;
  title?: string; // Optional, as TV shows use 'name'
  name?: string; // Optional, as movies use 'title'
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average?: number; // Optional, as some items might not have it or it could be null
  overview?: string; // Optional, sometimes truncated or missing in list views
  media_type?: 'movie' | 'tv' | 'person'; // Useful for mixed results (e.g., /trending/all)
  // Add other properties that are consistently present on list items if needed
}

/**
 * Common properties found on both movie and TV show objects when fetching full details.
 * This extends CommonListItemProperties to include more fields.
 */
export interface CommonDetailsProperties extends CommonListItemProperties {
  genres?: Genre[];
  original_language?: string;
  homepage?: string;
  imdb_id?: string; // Primarily for movies, but often present for TV if available
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  spoken_languages?: SpokenLanguage[];
  status?: string; // e.g., 'Released', 'Returning Series'
  tagline?: string;
  popularity?: number; // More detailed popularity score
  // You might also add `credits` here if you fetch cast/crew directly with details
}

// --- Specific Interfaces for Movie/TV List Items ---

/**
 * Interface for a single movie item when returned in a list (e.g., /movie/popular).
 */
export interface MovieListItem extends CommonListItemProperties {
  title: string; // Movies use 'title'
  original_title: string;
  release_date: string;
  video: boolean;
  adult: boolean;
  media_type: 'movie'; // Ensure this is explicitly 'movie' for clarity
}

/**
 * Interface for a single TV show item when returned in a list (e.g., /tv/popular).
 */
export interface TVShowListItem extends CommonListItemProperties {
  name: string; // TV shows use 'name'
  original_name: string;
  first_air_date: string;
  origin_country: string[];
  media_type: 'tv'; // Ensure this is explicitly 'tv' for clarity
}

// --- Specific Interfaces for Movie/TV Details ---

/**
 * Interface for full movie details (e.g., /movie/{id}).
 */
export interface MovieDetails extends CommonDetailsProperties {
  title: string;
  original_title: string;
  release_date: string;
  runtime?: number; // Movie specific
  budget?: number; // Movie specific
  revenue?: number; // Movie specific
  video: boolean;
  adult: boolean;
  belongs_to_collection?: BelongsToCollection; // Movie specific
  media_type: 'movie'; // Explicitly 'movie' for details
}

/**
 * Interface for full TV show details (e.g., /tv/{id}).
 */
export interface TVDetails extends CommonDetailsProperties {
  name: string;
  original_name: string;
  first_air_date: string;
  last_air_date: string;
  episode_run_time?: number[]; // Can be an array of numbers
  number_of_episodes?: number;
  number_of_seasons?: number;
  seasons?: Season[]; // Array of season objects
  in_production?: boolean;
  type?: string; // e.g., 'Scripted'
  origin_country: string[];
  media_type: 'tv'; // Explicitly 'tv' for details
 
  searchquery?: string; // Optional, if you want to include search query in details
}

// --- Supporting Interfaces (unchanged mostly, but good to have here) ---

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null; // logo_path can be null
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface Episode { // Keeping Episode here as it's a sub-part of Season details
  id: number;
  name: string;
  overview: string;
  // Add other episode properties if needed for detailed season/episode lists
}

export interface Season {
  season_number: number;
  name: string;
  episode_count?: number; // Number of episodes in this season
  poster_path?: string | null;
  air_date?: string; // Date the season first aired
  overview?: string;
  episodes?: Episode[]; // Optional: only if you fetch season details with episodes
}



export interface MovieDetails extends CommonListItemProperties {
  title: string; // Movies use 'title'
  original_title: string;
  release_date: string;
  video: boolean;
  adult: boolean;
  media_type: 'movie'; // Ensure this is explicitly 'movie' for clarity
}