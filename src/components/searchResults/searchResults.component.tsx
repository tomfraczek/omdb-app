import { ResultsContainer, ResultCard } from "./searchResults.styles";

interface Movie {
  Title: string;
  Year: string;
  Type: string;
  imdbID: string;
}

interface SearchResultsProps {
  Search: Movie[];
  quote: string;
}

export const SearchResults = ({ Search, quote }: SearchResultsProps) => {
  return (
    <ResultsContainer>
      <h2>Search results for: {quote}</h2>
      {Search.map((result) => (
        <ResultCard key={result.imdbID}>{result.Title}</ResultCard>
      ))}
    </ResultsContainer>
  );
};
