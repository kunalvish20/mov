import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const token = import.meta.env.VITE_API_TOKEN_KEY as string;
const baseUrl = import.meta.env.VITE_API_BASE_URL as string;

interface Genre {
  id: number;
  name: string;
}

interface Episode {
  id: number;
  name: string;
  overview: string;
}

interface Season {
  season_number: number;
  name: string;
  episode_count?: number; // Made optional as it might not always be present or needed for every season object
  poster_path?: string; // Added poster_path as it was in the Details.tsx interface
}

// This interface combines common fields for both movies and TV shows
// and includes specific ones that might differ (like first_air_date for TV)
interface MediaDetails {
  id: number;
  name?: string; // For TV shows
  original_title?: string; // For movies
  overview?: string;
  backdrop_path?: string;
  poster_path?: string;
  genres?: Genre[];
  runtime?: number; // For movies
  revenue?: number; // For movies
  release_date?: string; // For movies
  first_air_date?: string; // For TV shows
  original_language?: string;
  seasons?: Season[]; // For TV shows
  vote_average?: number; // Added vote_average as it's used in Details.tsx
}

// DetailsResponse should reflect the actual structure of the API response
// It should be the same as MediaDetails as that's what we expect to receive
interface DetailsResponse extends MediaDetails {}


// Corrected useDetails hook with better typing for the state
export const useDetails = <T extends MediaDetails>(url: string) => {
  const [details, setDetails] = useState<T | null>(null); // Renamed apiList to details
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDetails = async (): Promise<void> => {
      setLoading(true); // Set loading to true on each new fetch
      const options: AxiosRequestConfig = {
        method: "GET",
        url: `${baseUrl}${url}`,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response: AxiosResponse<T> = await axios.request(options);
        setDetails(response.data); // Set details here
        setTimeout(() => {
          setLoading(false);
        }, 500); // Slightly reduced timeout for a smoother feel, adjust as needed
      } catch (error) {
        console.error("Error fetching details:", error);
        setDetails(null); // Ensure details is null on error
        setLoading(false);
      }
    };

    fetchDetails();
  }, [url]);

  return { details, loading }; // Return details
};