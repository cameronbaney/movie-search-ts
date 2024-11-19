import { useEffect, useState } from "react";
import "./App.css";

import { type Api_Response } from "./types/api";

import { useWatchlist } from "./context/WatchlistContext";
import MovieCard from "./components/MovieCard/MovieCard";
import Pagination from "./components/Pagination/Pagination";

import { API_URL, FETCH_OPTIONS, SEARCH_FILTERS } from "./utils/constants";

const DEFAULT_MOVIES: Api_Response = {
  page: 1,
  results: [],
  total_pages: 0,
  total_results: 0,
};

function App() {
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Api_Response>(DEFAULT_MOVIES);
  const { watchlist, getWatchlist } = useWatchlist();

  const submitSearch = async (
    evt: React.FormEvent<HTMLFormElement>
  ) => {
    evt.preventDefault();

    if (query.trim()) {
      await searchMovies(1);
    } else {
      await getPopularMovies(1);
    }
  };

  const paginationSearch = async (page = 1) => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);

    if (query.trim()) {
      await searchMovies(page);
    } else {
      await getPopularMovies(page);
    }
  };

  const searchMovies = async (page: number) => {
    if (!query) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/search/movie?page=${page}&query=${query}`,
        FETCH_OPTIONS
      )
        .then((res) => res.json())
        .catch((err) => console.error(err));

      setMovies(response);
      setIsSearch(true);
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  };

  const getPopularMovies = async (page: number) => {
    setQuery("");

    try {
      const response = await fetch(
        `${API_URL}/discover/movie?page=${page}&${SEARCH_FILTERS}`,
        FETCH_OPTIONS
      )
        .then((res) => res.json())
        .catch((err) => console.error(err));

      setMovies(response);
      setIsSearch(false);
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  };

  useEffect(() => {
    getPopularMovies(movies.page);
    getWatchlist();
  }, []);

  return (
    <div className="md:max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
      <h1 className="mb-8">📽️ Movie time</h1>

      <div className="lg:grid lg:grid-cols-[300px_auto] lg:gap-12">
        <div className="mb-4 lg:mb-0">
          <h2>Your watchlist</h2>
          <div className="flex flex-col gap-y-4">
            {!watchlist.length && (
              <div className="flex flex-col text-center text-xl text-gray-400">
                <span>❌</span>
                <p className="italic">Add movies to your watchlist</p>
              </div>
            )}
            {watchlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} isWatchlistMovie />
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
              onClick={() => getPopularMovies(1)}
            >
              Clear search
            </button>
          </form>


          <Pagination
            currentPage={movies.page}
            totalPages={movies.total_pages}
            onPageChange={(page) => paginationSearch(page)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-8 py-4">
            {movies.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <Pagination
            currentPage={movies.page}
            totalPages={movies.total_pages}
            onPageChange={(page) => paginationSearch(page)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
