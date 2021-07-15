import { MovieSearchResult } from "@/types";
import axios, { AxiosResponse } from "axios";

const searchMovies = (
  query: string
): Promise<AxiosResponse<MovieSearchResult[]>> => {
  const urlEncodedQuery = encodeURI(query);
  return axios.get<MovieSearchResult[]>(
    `http://localhost:5000/api/movies/search?query=${urlEncodedQuery}`
  );
};

export default {
  searchMovies,
};
