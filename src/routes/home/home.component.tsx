import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Search } from "../../components/search";
import { SearchResults } from "../../components/searchResults";
import { Spinner } from "../../components/spinner";
import { ToggleFilters } from "../../components/toggleFilters";
import { YearSelect } from "../../components/yearSelect";
import { color } from "../../theme";

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
  color: white;
  text-align: center;
  font-size: ${(props) => (props.hasResults ? "1.5rem" : "3rem")};
  font-weight: 600;
`;

export const FiltersContainer = styled.div`
  display: flex;
  padding-left: 16px;
`;

const ResultsHead = styled.div`
  background-color: ${color.white};
  width: 80%;
  margin: 0 auto;
`;

const ResultsContainer = styled.div`
  background-color: ${color.white};
  width: 80%;
  margin: 0 auto;
`;

export const SearchHeader = styled.h2`
  text-align: center;
`;

export const Home = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [type, setType] = useState<string>("");
  const [year, setYear] = useState<number>(0);

  const fetchQueryData = async (
    query: string,
    page: number = 1,
    type?: string,
    year?: number
  ) => {
    setLoading(true);

    try {
      const typeParam = type ? `&type=${type}` : "";
      const yearParam = year ? `&y=${year}` : "";
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${query}&page=${page}${typeParam}${yearParam}&apikey=acd962bb`
      );
      setResults(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const value = (event.target as HTMLInputElement).value;
      setQuery(value);
      fetchQueryData(value);
    }
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
    fetchQueryData(query, page, type, year);
  };

  const resetSearch = () => {
    setQuery("");
    setResults(null);
  };

  const handleTypeChange = (newType: string) => {
    setType(newType);
    fetchQueryData(query, 1, newType, year);
  };

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
    fetchQueryData(query, 1, type, newYear);
  };

  return (
    <MainScreenContainer hasResults={!!results}>
      <ViewContainer>
        <Header hasResults={!!results}>OMDb Search API</Header>
        <Search
          handleKeyDown={handleKeyDown}
          setSearch={setQuery}
          resetSearch={resetSearch}
          value={query}
          displayReset={!!results || !!query}
        />
      </ViewContainer>

      {results && (
        <ResultsHead>
          <SearchHeader>Search results for: {query}</SearchHeader>
          <FiltersContainer>
            <ToggleFilters onFilterChange={handleTypeChange} />
            <YearSelect onYearChange={handleYearChange} />
          </FiltersContainer>
        </ResultsHead>
      )}

      {loading ? (
        <Spinner />
      ) : (
        results && (
          <ResultsContainer>
            {results.Response === "True" ? (
              <SearchResults
                results={results}
                query={query}
                handleChangePage={handleChangePage}
                page={page}
              />
            ) : (
              <p>{results.Error}</p>
            )}
          </ResultsContainer>
        )
      )}
    </MainScreenContainer>
  );
};
