export const API_URL = "https://api.themoviedb.org/3";
export const ACCOUNT_ID = import.meta.env.VITE_TMDB_ACCOUNT_ID;
export const API_KEY = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;

export const FETCH_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const DEFAULT_SEARCH_FILTERS = {
  include_adult: false,
  language: "en-US",
  original_language: "en-US",
  certification: "G|PG|PG-13|R",
  certification_country: "US",
};

function objectToQueryString(obj: Record<string, string | boolean>) {
  return Object.entries(obj)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
}
export const SEARCH_FILTERS = objectToQueryString(DEFAULT_SEARCH_FILTERS);
