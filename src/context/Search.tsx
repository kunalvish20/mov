import { createContext, useContext, useState, ReactNode } from "react";

interface SearchContextType {
  searchQuery: string | null;
  setSearchQuery: (data: string | null) => void;
}

export const SearchContext = createContext<SearchContextType>({
  searchQuery: null,
  setSearchQuery: () => {},
});

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const value = {
    searchQuery,
    setSearchQuery,
  };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
