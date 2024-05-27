import "./App.css";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { color } from "./theme";

import axios from "axios";
import { Search } from "./components/search";
import { SearchResults } from "./components/searchResults";
import { Spinner } from "./components/spinner";

export interface Movie {
  Title: string;
  Year: string;
  Type: string;
  imdbID: string;
  Poster: string;
}

export interface SearchResults {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

interface MainScreenContainerProps {
  hasResults: boolean;
}

const MainScreenContainer = styled.div<MainScreenContainerProps>`
  display: flex;
  flex-direction: column;
  min-height: ${(props) => (props.hasResults ? "100vh" : "50vh")};
`;

const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h2<MainScreenContainerProps>`
  color: ${color.white};
  font-size: ${(props) => (props.hasResults ? "1.5rem" : "3rem")};
  font-weight: 600;
`;

function App() {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [page, setPage] = useState<number | null>(null);

  const fetchMovieData = async (title: string, page: number = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${title}&page=${page}&apikey=acd962bb`
      );
      console.log(response.data);

      setResults(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchMovieData((event.target as HTMLInputElement).value);
    }
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    fetchMovieData(search, value);
  };

  const resetSearch = () => {
    setSearch("");
  };

  return (
    <MainScreenContainer hasResults={!!results}>
      <ViewContainer>
        <Header hasResults={!!results}>OMDb Search API</Header>
        <Search
          handleKeyDown={handleKeyDown}
          setSearch={setSearch}
          resetSearch={resetSearch}
          value={search}
          displayReset={!!results || !!search}
        />
      </ViewContainer>

      {loading ? (
        <Spinner />
      ) : (
        results && (
          <>
            {results.Response === "True" ? (
              <SearchResults
                results={results}
                quote={search}
                handleChangePage={handleChangePage}
                page={page}
              />
            ) : (
              <p>{results.Error}</p>
            )}
          </>
        )
      )}
    </MainScreenContainer>
  );
}

export default App;
