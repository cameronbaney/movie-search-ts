import { type Movie } from "../../types/movie";

interface Props {
  movie: Movie;
  watchlist?: boolean;
  addToWatchlist?: (id: number, watchlist: boolean) => void;
}

export default function MovieCard({ movie, watchlist, addToWatchlist }: Props) {
  const formattedDate = new Date(movie.release_date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const watchListLabel = watchlist
    ? "Remove from watchlist"
    : "Add to watchlist";

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img
        className="w-full"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2 text-gray-800">{movie.title}</h2>
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
          {movie.vote_average.toFixed(1)}
        </span>
        <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
          {formattedDate}
        </span>
        {addToWatchlist && (
          <button
            className="mt-4"
            onClick={() => addToWatchlist(movie.id, watchlist ? false : true)}
          >
            {watchListLabel}
          </button>
        )}
      </div>
    </div>
  );
}
