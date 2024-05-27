import { useState } from "react";
import { Movie } from "../../App";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";

import {
  ResultsContainer,
  PosterImage,
  FilterButton,
  FiltersContainer,
} from "./searchResults.styles";

interface SearchResultsProps {
  // Search: Movie[];
  results: { Search: Movie[]; totalResults: string };
  quote: string;
  handleChangePage: (event: React.ChangeEvent<unknown>, value: number) => void;
  page: number | null;
}

export const SearchResults = ({
  results,
  quote,
  handleChangePage,
  page,
}: SearchResultsProps) => {
  const [searchQuote] = useState<string>(quote);
  const { Search, totalResults } = results;
  const pagesCount = Math.round(parseInt(results.totalResults) / 10);

  return (
    <ResultsContainer>
      <h2>Search results for: {searchQuote}</h2>
      <FiltersContainer>
        <FilterButton>All</FilterButton>
        <FilterButton>Movies</FilterButton>
        <FilterButton>Series</FilterButton>
        <FilterButton>Episodes</FilterButton>
      </FiltersContainer>
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

      {parseInt(totalResults) > 1 && (
        <Pagination
          style={{ margin: "15px auto", width: "fit-content" }}
          page={page}
          count={pagesCount}
          shape="rounded"
          onChange={handleChangePage}
        />
      )}
    </ResultsContainer>
  );
};
