import axios from "axios";
import { SearchResultsType } from "../routes/home/home.types";

export const fetchQueryData = async (
  query: string,
  page: number = 1,
  type?: string,
  year?: number
): Promise<SearchResultsType | null> => {
  try {
    const typeParam = type ? `&type=${type}` : "";
    const yearParam = year ? `&y=${year}` : "";
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${query}&page=${page}${typeParam}${yearParam}&apikey=acd962bb`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
