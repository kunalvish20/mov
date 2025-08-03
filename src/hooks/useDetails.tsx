// src/hooks/useDetails.tsx (Example usage)
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
// Import the new MovieDetails and TVDetails (or a combined one if you prefer)
import { MovieDetails, TVDetails } from "@/types/types";

const token = import.meta.env.VITE_API_TOKEN_KEY as string;
const baseUrl = import.meta.env.VITE_API_BASE_URL as string;

// The generic type T will be either MovieDetails or TVDetails when used
export const useDetails = <T extends MovieDetails | TVDetails>(url: string) => {
  const [details, setDetails] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async (): Promise<void> => {
      setLoading(true);
      setError(null);
      setDetails(null);

      const options: AxiosRequestConfig = {
        method: "GET",
        url: `${baseUrl}${url}`,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        // AxiosResponse expects the exact type T
        const response: AxiosResponse<T> = await axios.request(options);
        setDetails(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error("Error fetching details:", err);
        setError("Failed to fetch details. Please try again later.");
        setDetails(null);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [url]);

  return { details, loading, error };
};