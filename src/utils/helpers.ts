import axios from "axios";
import { SearchResultsType } from "../routes/home/home.types";

export const fetchQueryData = async (
  query: string,
  page: number = 1,
  type?: string,
  year?: number,
  filmId?: string
): Promise<SearchResultsType | null> => {
  try {
    const typeParam = type ? `&type=${type}` : "";
    const yearParam = year ? `&y=${year}` : "";
    const idParam = filmId
      ? `&i=${filmId}`
      : `&s=${query}&page=${page}${typeParam}${yearParam}`;

    const response = await axios.get(
      `https://www.omdbapi.com/?${idParam}&apikey=acd962bb`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
