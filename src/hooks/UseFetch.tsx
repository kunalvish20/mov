// src/hooks/useFetch.tsx
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
// Import the new PaginatedApiResponse and CommonListItemProperties
import { PaginatedApiResponse, CommonListItemProperties } from "@/types/types"; // Ensure this path is correct based on your project structure

const token = import.meta.env.VITE_API_TOKEN_KEY as string;
const baseUrl = import.meta.env.VITE_API_BASE_URL as string;

// Make useFetch truly generic. T will be the type of each item in the results array.
// T should extend CommonListItemProperties (or a more specific ListItem if needed).
export const useFetch = <T extends CommonListItemProperties>(
  url: string,
  genreId?: number,
  searchQuery?: string
) => {
  const [apiList, setApiList] = useState<T[]>([]); // apiList is now an array of type T
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      setError(null);
      setApiList([]); // Clear previous data on new fetch

      // Construct params dynamically to only include if defined
      const params: Record<string, any> = {};
      if (genreId !== undefined && genreId !== null) {
        params.with_genres = genreId;
      }
      // Ensure searchQuery is not just an empty string or whitespace
      if (searchQuery !== undefined && searchQuery !== null && searchQuery.trim() !== '') {
        params.query = searchQuery;
      }

      const options: AxiosRequestConfig = {
        method: "GET",
        url: `${baseUrl}${url}`,
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: params, // Use the dynamically constructed params
      };

      try {
        // Response is typed as PaginatedApiResponse<T>
        const response: AxiosResponse<PaginatedApiResponse<T>> = await axios.request(options);
        setApiList(response.data.results);
        // A small delay for a smoother loading experience, as you had it
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      }
    };

    // Dependencies: url, genreId, searchQuery will trigger refetch when changed.
    // This is correct as any change in these will require a new API call.
    fetchData();
  }, [url, genreId, searchQuery]);

  return { apiList, loading, error };
};