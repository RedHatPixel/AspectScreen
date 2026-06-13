import type {
  TmdbListResponse,
  TmdbMovieDetails,
  TmdbMovieResult,
} from "@/types/tmdb";

type TmdbQueryParams = Record<string, string | number | boolean | undefined>;

const TMDB_URL = process.env.NEXT_PUBLIC_TMDB_URL;
const TMDB_IMG = process.env.NEXT_PUBLIC_TMDB_IMG;
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_API_READ_ACCESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN;

const ensureEnv = (value: string | undefined, name: string): string => {
  if (!value || value.trim().length === 0) {
    throw new Error(`Missing TMDB environment variable: ${name}`);
  }
  return value.replace(/\/+$|^\/+/, "");
};

const buildUrl = (path: string, params: TmdbQueryParams = {}) => {
  const baseUrl = ensureEnv(TMDB_URL, "TMDB_URL");
  const url = new URL(`${baseUrl}/${path.replace(/^\/+/, "")}`);

  if (TMDB_API_KEY) {
    url.searchParams.set("api_key", TMDB_API_KEY);
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
};

const fetchTmdb = async <T>(path: string, params: TmdbQueryParams = {}): Promise<T> => {
  const requestUrl = buildUrl(path, params);

  const headers = new Headers({ Accept: "application/json" });
  if (TMDB_API_READ_ACCESS_TOKEN) {
    headers.set("Authorization", `Bearer ${TMDB_API_READ_ACCESS_TOKEN}`);
  }

  const response = await fetch(requestUrl, { headers });
  if (!response.ok) {
    throw new Error(`TMDB request failed (${response.status}): ${response.statusText}`);
  }

  return response.json() as Promise<T>;
};

export const getTmdbImageUrl = (path: string | null, size = "w500"): string => {
  const imageHost = ensureEnv(TMDB_IMG, "TMDB_IMG");

  if (!path) {
    return "";
  }

  return `${imageHost}/${size}${path.startsWith("/") ? path : `/${path}`}`;
};

export const tmdb = {
  get: fetchTmdb,

  async getMovie(tmdbId: string): Promise<TmdbMovieDetails> {
    return fetchTmdb<TmdbMovieDetails>(`movie/${tmdbId}`);
  },

  async getMovieDetails(
    tmdbId: string,
    appendToResponse?: string,
  ): Promise<TmdbMovieDetails> {
    return fetchTmdb<TmdbMovieDetails>(`movie/${tmdbId}`, {
      append_to_response: appendToResponse,
    });
  },

  async searchMovies(
    query: string,
    page = 1,
    includeAdult = false,
  ): Promise<TmdbListResponse<TmdbMovieResult>> {
    return fetchTmdb<TmdbListResponse<TmdbMovieResult>>("search/movie", {
      query,
      page,
      include_adult: includeAdult,
    });
  },

  async discoverMovies(
    params: TmdbQueryParams = {},
  ): Promise<TmdbListResponse<TmdbMovieResult>> {
    return fetchTmdb<TmdbListResponse<TmdbMovieResult>>("discover/movie", params);
  },

  async discoverMoviesByGenre(
    genreId: number,
    params: TmdbQueryParams = {},
  ): Promise<TmdbListResponse<TmdbMovieResult>> {
    return fetchTmdb<TmdbListResponse<TmdbMovieResult>>("discover/movie", {
      ...params,
      with_genres: genreId,
    });
  },

  async getTrending(
    mediaType: "movie" | "tv" | "all" = "movie",
    timeWindow: "day" | "week" = "week",
  ): Promise<TmdbListResponse<TmdbMovieResult>> {
    return fetchTmdb<TmdbListResponse<TmdbMovieResult>>(
      `trending/${mediaType}/${timeWindow}`,
    );
  },
};
