import { useWatchlist } from "../../context/WatchlistContext";
import MovieCard from "../MovieCard/MovieCard";

export default function Watchlist() {
  const { watchlist } = useWatchlist();

  return (
    <>
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
    </>
  );
}
