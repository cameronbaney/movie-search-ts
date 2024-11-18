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

  const watchListLabel = watchlist ? "Remove" : "Add to watchlist";

  return (
    <div
      className={`flex rounded overflow-hidden shadow bg-white ${
        watchlist ? "flex-row" : "md:flex-col"
      }`}
    >
      <img
        className={`w-28 ${watchlist ? "" : "md:w-full"}`}
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <div className="px-6 py-4 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className={`font-bold mb-2 text-lg text-gray-800 ${watchlist ? "" : "md:text-xl"}`}>
            {movie.title}
          </h3>
          <div>
            {watchlist ? null : (
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                {movie.vote_average.toFixed(1)}
              </span>
            )}
            <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
              {formattedDate}
            </span>
          </div>
        </div>
        {addToWatchlist && (
          <button
            className={`mt-4 text-sm ${watchlist ? "btn-remove" : "btn-add md:text-base"}`}
            onClick={() => addToWatchlist(movie.id, watchlist ? false : true)}
          >
            {watchListLabel}
          </button>
        )}
      </div>
    </div>
  );
}
