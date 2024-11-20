import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

import { useWatchlist } from "./context/WatchlistContext";
import MovieCard from "./components/MovieCard/MovieCard";
import MoviesList from "./components/MoviesList/MoviesList";

const queryClient = new QueryClient();

function App() {
  const { watchlist } = useWatchlist();
  const [inputQuery, setInputQuery] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [page, setPage] = React.useState(1);

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    setSearchQuery(inputQuery);
    setPage(1);
  };

  return (
    <QueryClientProvider client={queryClient}>
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
            <form className="flex" onSubmit={handleSubmit}>
              <input
                className="mr-2 p-2 flex-1 rounded text-black"
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Search for a movie"
              />
              <button className="btn-primary mr-2" type="submit">
                Search
              </button>
              <button
                className="btn-primary"
                type="button"
                onClick={() => {
                  setInputQuery("");
                  setSearchQuery("");
                  setPage(1);
                }}
              >
                Clear search
              </button>
            </form>
            <Suspense fallback={<div>Loading...</div>}>
              <MoviesList
                query={searchQuery}
                page={page}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
