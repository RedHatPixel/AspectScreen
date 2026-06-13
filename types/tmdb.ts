export type TmdbGenre = {
  id: number;
  name: string;
};

export type TmdbProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

export type TmdbProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type TmdbSpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type TmdbMovieResult = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  media_type?: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TmdbListResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type TmdbDiscoverParams = Record<string, string | number | boolean | undefined>;

export type TmdbMovieDetails = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | { id: number; name: string; poster_path: string | null; backdrop_path: string | null };
  budget: number;
  genres: TmdbGenre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: TmdbProductionCompany[];
  production_countries: TmdbProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: TmdbSpokenLanguage[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  [key: string]: unknown;
};
