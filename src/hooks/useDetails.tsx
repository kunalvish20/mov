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
  episodes?: Episode[];
  episode_count: number;
}

interface DetailsProps {
  id: number;
  name?: string;
  original_title?: string;
  poster_path?: string;
  backdrop_path: string;
  overview: string;
  genres: Genre[];
  runtime: number;
  release_date: string;
  original_language: string;
  revenue: number;
  seasons?: Season[];
}

// DetailsResponse should reflect the actual structure of the API response
interface DetailsResponse {
  id: number;
  name?: string;
  original_title?: string;
  poster_path?: string;
  backdrop_path: string;
  overview: string;
  genres: Genre[];
  runtime: number;
  release_date: string;
  original_language: string;
  revenue: number;
  seasons?: Season[];
}

export const useDetails = (url: string) => {
  const [apiList, setApiList] = useState<DetailsProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDetails = async (): Promise<void> => {
      const options: AxiosRequestConfig = {
        method: "GET",
        url: `${baseUrl}${url}`,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response: AxiosResponse<DetailsResponse> = await axios.request(
          options
        );
        setApiList(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchDetails();
  }, [url]);

  return { apiList, loading };
};
