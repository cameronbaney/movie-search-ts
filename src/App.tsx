import React, { Suspense } from "react";
import "./App.css";

import MoviesList from "./components/MoviesList/MoviesList";
import Watchlist from "./components/Watchlist/Watchlist";
import LoadingIcon from "./components/LoadingIcon/LoadingIcon";

function App() {
  const [inputQuery, setInputQuery] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [page, setPage] = React.useState(1);

  // Debounce the search query to prevent unnecessary API calls
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(inputQuery);
      setPage(1);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputQuery]);

  return (
    <div className="md:max-w-8xl mx-auto px-2 sm:px-6 md:px-8">
      <h1 className="mb-8">📽️ Movie time</h1>
      <div className="lg:grid lg:grid-cols-[300px_auto] lg:gap-12">
        <div className="mb-4 lg:mb-0">
          <Watchlist />
        </div>
        <div>
          <h2>Movies</h2>
          <div className="flex flex-wrap">
            <input
              className="p-2 flex-1 rounded text-black"
              type="text"
              value={inputQuery}
              onChange={(evt) => setInputQuery(evt.target.value)}
              placeholder="Search for a movie"
            />
          </div>
          <Suspense fallback={
            <div className="flex justify-center items-center py-4">
              <LoadingIcon size="lg" />
            </div>
          }>
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
