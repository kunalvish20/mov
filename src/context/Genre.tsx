import { createContext, useState, ReactNode, useContext } from "react";

interface GenreContextType {
  genres: number | null;
  setGenres: (data: number | null) => void;
}

export const GenreContext = createContext<GenreContextType>({
  genres: null,
  setGenres: () => {},
});

export const GenreProvider = ({ children }: { children: ReactNode }) => {
  const [genres, setGenres] = useState<number | null>(null);
  const value = {
    genres,
    setGenres,
  };
  return (
    <GenreContext.Provider value={value}>{children}</GenreContext.Provider>
  );
};

export const useGenres = () => useContext(GenreContext);
