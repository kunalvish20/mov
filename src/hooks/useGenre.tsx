import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const token = import.meta.env.VITE_API_TOKEN_KEY as string;
const baseUrl = import.meta.env.VITE_API_BASE_URL as string;

interface GenreProps {
  id: number;
  name: string;
}

interface GenreResponse {
  genres: GenreProps[];
}

export const useGenre = (url: string) => {
  const [apiList, setApiList] = useState<GenreProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const options: AxiosRequestConfig = {
    method: "GET",
    url: `${baseUrl}${url}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async (): Promise<void> => {
    try {
      const response: AxiosResponse<GenreResponse> = await axios.request(
        options
      );
      setApiList(response.data.genres);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  return { apiList, loading };
};
