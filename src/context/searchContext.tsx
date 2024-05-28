import React, { createContext, useContext, useState, ReactNode } from "react";
import { SearchResultsType } from "../routes/home/home.types";

interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
  search: string;
  setSearch: (search: string) => void;
  results: SearchResultsType | null;
  setResults: (results: SearchResultsType | null) => void;
  page: number;
  setPage: (page: number) => void;
  type: string;
  setType: (type: string) => void;
  year: number;
  setYear: (year: number) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<SearchResultsType | null>(null);
  const [page, setPage] = useState<number>(1);
  const [type, setType] = useState<string>("");
  const [year, setYear] = useState<number>(0);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        search,
        setSearch,
        results,
        setResults,
        page,
        setPage,
        type,
        setType,
        year,
        setYear,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
