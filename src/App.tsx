import "./App.css";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { color } from "./theme";
import searchIcon from "./images/icons/search.svg";

import Pagination from "@mui/material/Pagination";
import axios from "axios";

interface Movie {
  totalResults: string;
}

interface SearchResults {
  Search: Movie[];
  totalResults: string;
}

const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h2`
  color: ${color.white};
  font-size: 3rem;
  font-weight: 600;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 50%;
  height: 60px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  background-color: ${color.white};
  border: none;
  color: ${color.foreground};
  height: 44px;
  outline: 0;
  border-radius: 50px;
  padding-left: 40px;
`;

const SearchIcon = styled.img`
  position: absolute;
  left: 10px;
  top: 10px;
  width: 25px;
`;

function App() {
  const [search, setSearch] = useState<string | null>(null);
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchMovieData = async (title: string, page: number = 1) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${title}&page=${page}&apikey=acd962bb`
      );

      console.log(response.data);

      setResults(response.data);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError("Error fetching data. Please try again.");
      setResults(null);
    }
  };
  useEffect(() => {
    // console.log(results);
  }, [results]);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // console.log(event.target.value);
      fetchMovieData((event.target as HTMLInputElement).value);
    }
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (search) fetchMovieData(search, value);
  };
  return (
    <>
      <ViewContainer>
        <Header>OMDb Search API</Header>
        <SearchContainer>
          <SearchIcon src={searchIcon} />
          <SearchInput
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search"
          />
        </SearchContainer>
      </ViewContainer>
      {results && (
        <Pagination
          count={Math.round(parseInt(results.totalResults) / 10)}
          shape="rounded"
          onChange={handleChange}
        />
      )}
    </>
  );
}

export default App;
