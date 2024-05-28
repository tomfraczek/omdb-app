export interface Movie {
  Title: string;
  Year: string;
  Type: string;
  imdbID: string;
  Poster: string;
}

export interface SearchResultsType {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface MainScreenContainerProps {
  hasResults: boolean;
}
