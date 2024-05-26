import "./App.css";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { color } from "./theme";

import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { Search } from "./components/search";
import { SearchResults } from "./components/searchResults";

interface Movie {
  Title: string;
  Year: string;
  Type: string;
  imdbID: string;
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
  height: ${(props) => (props.hasResults ? "100vh" : "50vh")};
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

  const fetchMovieData = async (title: string, page: number = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${title}&page=${page}&apikey=acd962bb`
      );
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
    fetchMovieData(search, value);
  };

  const resetSearch = () => {
    setResults(null);
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
        <p>Loading...</p>
      ) : (
        results && (
          <>
            {results.Response === "True" ? (
              <SearchResults Search={results.Search} quote={search} />
            ) : (
              <p>{results.Error}</p>
            )}
          </>
        )
      )}

      {results && parseInt(results.totalResults) > 1 && (
        <Pagination
          style={{ margin: "auto", marginBottom: "50px" }}
          count={Math.round(parseInt(results.totalResults) / 10)}
          shape="rounded"
          onChange={handleChangePage}
        />
      )}
    </MainScreenContainer>
  );
}

export default App;
