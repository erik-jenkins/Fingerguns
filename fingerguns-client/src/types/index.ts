export interface Docket {
  id: number;
  movies: Movie[];
}

export interface Movie {
  adult: boolean;
  backdropPath: string | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdbId: string | null;
  originalLanguage: string;
  originalTitle: string;
  overview: string | null;
  popularity: number;
  posterPath: string | null;
  releaseDate: Date;
  revenue: number;
  runtime: number | null;
  status: string;
  tagline: string | null;
  title: string;
  voteAverage: number;
  voteCount: number;
}

export interface BaseSearchResponse<T> {
  page: number;
  results: T[];
  totalResults: number;
  totalPages: number;
}

export interface MovieSearchResult {
  posterPath: string | null;
  adult: boolean;
  overview: string;
  releaseDate: Date;
  genreIds: number[];
  id: number;
  originalTitle: string;
  originalLanguage: string;
  title: string;
  backdropPath: string | null;
  popularity: number;
  voteCount: number;
  video: boolean;
  voteAverage: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface SearchMoviesResponse {
  posterPath: string;
  adult: boolean;
  overview: string;
  releaseDate: string;
  genreIds: number[];
  tmdbId: number;
  originalTitle: string;
  originalLanguage: string;
  title: string;
  backdropPath: string;
  popularity: number;
  voteCount: number;
  video: boolean;
  voteAverage: number;
}

export interface TmdbSearchResponse<T> {
  page: number;
  results: T[];
  totalResults: number;
  totalPages: number;
}
