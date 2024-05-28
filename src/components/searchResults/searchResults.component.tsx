import { Movie } from "../../App";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import clipboardIcon from "../../images/icons/clapperboard.png";

import { ResultsContainer, PosterImage } from "./searchResults.styles";

interface SearchResultsProps {
  results: {
    Search: Movie[];
    totalResults: string;
  };
  query: string;
  handleChangePage: (event: React.ChangeEvent<unknown>, value: number) => void;
  page: number;
}

export const SearchResults = ({
  results,
  handleChangePage,
  page,
}: SearchResultsProps) => {
  const { Search, totalResults } = results;
  const pagesCount = Math.round(parseInt(results.totalResults) / 10);

  return (
    <ResultsContainer>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {Search.map((result) => (
              <TableRow
                key={result.Title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <PosterImage
                    src={result.Poster ? result.Poster : clipboardIcon}
                  />
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
