import {
  ResultsContainer,
  PosterImage,
  FilterButton,
  FilterContainer,
} from "./searchResults.styles";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface Movie {
  Title: string;
  Year: string;
  Type: string;
  imdbID: string;
  Poster: string;
}

interface SearchResultsProps {
  Search: Movie[];
  quote: string;
}

export const SearchResults = ({ Search, quote }: SearchResultsProps) => {
  return (
    <ResultsContainer>
      <h2>Search results for: {quote}</h2>
      {/* <FilterContainer>
        <FilterButton></FilterButton>
      </FilterContainer> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {Search.map((result) => (
              <TableRow
                key={result.Title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <PosterImage src={result.Poster} />
                </TableCell>
                <TableCell>{result.Title}</TableCell>
                <TableCell>{result.Type}</TableCell>
                <TableCell>{result.Year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ResultsContainer>
  );
};
