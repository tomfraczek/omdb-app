import { useState } from "react";
import { Search } from "../../components/search";
import { SearchResults } from "../../components/searchResults";
import { Spinner } from "../../components/spinner";
import { ToggleFilters } from "../../components/toggleFilters";
import { YearSelect } from "../../components/yearSelect";
import { fetchQueryData } from "../../utils/helpers";

import {
  MainScreenContainer,
  ViewContainer,
  Header,
  ResultsHead,
  SearchHeader,
  FiltersContainer,
  ResultsContainer,
  ErrorMessage,
} from "./home.styles";
import { useSearchContext } from "../../context/searchContext";

export const Home = () => {
  const {
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
  } = useSearchContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const value = (event.target as HTMLInputElement).value;
      setQuery(value);
      setSearch(value);
      setLoading(true);
      const data = await fetchQueryData(value);
      setResults(data);
      setLoading(false);
    }
  };

  const handleChangePage = async (
    _: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
    setLoading(true);
    const data = await fetchQueryData(query, page, type, year);
    setResults(data);
    setLoading(false);
  };

  const resetSearch = () => {
    setQuery("");
    setResults(null);
  };

  const handleChangeType = async (newType: string) => {
    setType(newType);
    setLoading(true);
    const data = await fetchQueryData(query, 1, newType, year);
    setResults(data);
    setLoading(false);
  };

  const handleYearChange = async (newYear: number) => {
    setYear(newYear);
    setLoading(true);
    const data = await fetchQueryData(query, 1, type, newYear);
    setResults(data);
    setLoading(false);
  };

  return (
    <MainScreenContainer hasResults={!!results}>
      <ViewContainer>
        <Header hasResults={!!results}>MovieDB</Header>
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
          <SearchHeader>Search results for: {search}</SearchHeader>
          <FiltersContainer>
            <ToggleFilters onFilterChange={handleChangeType} />
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
              <ErrorMessage>{results.Error}</ErrorMessage>
            )}
          </ResultsContainer>
        )
      )}
    </MainScreenContainer>
  );
};
