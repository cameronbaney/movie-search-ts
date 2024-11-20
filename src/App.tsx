import React, { Suspense } from "react";
import "./App.css";

import MoviesList from "./components/MoviesList/MoviesList";
import Watchlist from "./components/Watchlist/Watchlist";

function App() {
  const [inputQuery, setInputQuery] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [page, setPage] = React.useState(1);

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    setSearchQuery(inputQuery);
    setPage(1);
  };

  return (
    <div className="md:max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
      <h1 className="mb-8">📽️ Movie time</h1>
      <div className="lg:grid lg:grid-cols-[300px_auto] lg:gap-12">
        <div className="mb-4 lg:mb-0">
          <Watchlist />
        </div>
        <div>
          <h2>Movies</h2>
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
  );
}

export default App;
