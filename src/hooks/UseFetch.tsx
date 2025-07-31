import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const token = import.meta.env.VITE_API_TOKEN_KEY as string;
const baseUrl = import.meta.env.VITE_API_BASE_URL as string;

// console.log("token", token);
// console.log("base-url", baseUrl);

interface MovieProps {
  id: number;
  title: string;
  name?: string;
  poster_path: string;
  backdrop_path: string;
  release_dare: string;
  vote_count: number;
  vote_average: number;
  release_date: React.ReactNode;
  overview: string;
  media_type: string;
}

interface MovieResponse {
  results: MovieProps[];
}

export const useFetch = (
  url: string,
  genreId?: number,
  searchQuery?: string
) => {
  const [apiList, setApiList] = useState<MovieProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const options: AxiosRequestConfig = {
    method: "GET",
    url: `${baseUrl}${url}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      with_genres: genreId,
      query: searchQuery,
    },
  };
  useEffect(() => {
    fetchMovies();
  }, [url, genreId, searchQuery]);

  const fetchMovies = async (): Promise<void> => {
    try {
      const response: AxiosResponse<MovieResponse> = await axios.request(
        options
      );
      setApiList(response.data.results);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return { apiList, loading };
};
