import { ResultsContainer, ResultCard } from "./searchResults.styles";

interface Movie {
  Title: string;
  Year: string;
  Type: string;
  imdbID: string;
}

interface SearchResultsProps {
  Search: Movie[];
}

export const SearchResults = ({ Search }: SearchResultsProps) => {
  return (
    <ResultsContainer>
      {Search.map((result) => (
        <ResultCard key={result.imdbID}>{result.Title}</ResultCard>
      ))}
    </ResultsContainer>
  );
};
