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
