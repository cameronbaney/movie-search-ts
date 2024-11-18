import { useEffect, useState } from "react";
import "./App.css";

import { type Movie } from "./types/movie";

import MovieCard from "./components/MovieCard/MovieCard";

const API_URL = "https://api.themoviedb.org/3";
const ACCOUNT_ID = import.meta.env.VITE_TMDB_ACCOUNT_ID;
const API_KEY = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  const submitSearch = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (query.trim()) {
      await searchMovies();
    } else {
      await getPopularMovies();
    }
  };

  const searchMovies = async () => {
    if (!query) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/search/movie?page=1&query=${query}`,
        options
      )
        .then((res) => res.json())
        .catch((err) => console.error(err));

      setMovies(response.results);
      setIsSearch(true);
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  };

  const getPopularMovies = async () => {
    setQuery("");

    try {
      const response = await fetch(
        `${API_URL}/movie/popular?language=en-US&page=1`,
        options
      )
        .then((res) => res.json())
        .catch((err) => console.error(err));

      setMovies(response.results);
      setIsSearch(false);
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  };

  const addToWatchlist = async (id: number, addToList = true) => {
    console.log("add");
    try {
      const body = {
        media_type: "movie",
        media_id: id,
        watchlist: addToList,
      };
      await fetch(`${API_URL}/account/${ACCOUNT_ID}/watchlist`, {
        ...options,
        method: "POST",
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .catch((err) => console.error(err));

      getWatchlist();
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  };

  const getWatchlist = async () => {
    try {
      const response = await fetch(
        `${API_URL}/account/${ACCOUNT_ID}/watchlist/movies`,
        options
      )
        .then((res) => res.json())
        .catch((err) => console.error(err));

      setWatchlist(response.results);
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  };

  useEffect(() => {
    getPopularMovies();
    getWatchlist();
  }, []);

  return (
    <div className="md:max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
      <h1 className="mb-8">📽️ Movie time</h1>

      <div className="lg:grid lg:grid-cols-[300px_auto] lg:gap-12">
        <div className="mb-4 lg:mb-0">
          <h2>Your watchlist</h2>
          <div className="flex flex-col gap-y-4">
            {watchlist.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                addToWatchlist={addToWatchlist}
                watchlist
              />
            ))}
          </div>
        </div>
        <div>
          {isSearch ? (
            <h2>Search results for {query}</h2>
          ) : (
            <h2>Popular movies</h2>
          )}

          <form className="flex" onSubmit={submitSearch}>
            <input
              className="mr-2 p-2 flex-1 rounded text-black"
              type="text"
              value={query}
              onInput={(evt) => setQuery(evt.currentTarget.value)}
              placeholder="Search for a movie"
            />
            <button className="btn-primary mr-2" type="submit">
              Search
            </button>
            <button
              className="btn-primary"
              type="button"
              onClick={getPopularMovies}
            >
              Clear search
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-8 py-4">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                addToWatchlist={addToWatchlist}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
