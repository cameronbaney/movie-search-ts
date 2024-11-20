import { useState } from "react";

import { type Movie } from "../../types/movie";
import { useWatchlist } from "../../context/WatchlistContext";

import LoadingIcon from "../LoadingIcon/LoadingIcon";

interface Props {
  movie: Movie;
  isWatchlistMovie?: boolean;
}

export default function MovieCard({ movie, isWatchlistMovie }: Props) {
  const { watchlist, addToWatchlistMutation } = useWatchlist();
  const [isPending, setIsPending] = useState(false);

  const formattedDate = new Date(movie.release_date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const isInWatchlist = watchlist.some((m) => m.id === movie.id);
  const watchListLabel = isInWatchlist ? "Remove" : "Add to watchlist";

  const handleWatchlistAction = () => {
    setIsPending(true);
    addToWatchlistMutation.mutate(
      {
        id: movie.id,
        addToList: !isInWatchlist,
      },
      {
        onSettled: () => {
          setIsPending(false);
        },
      }
    );
  };

  return (
    <div
      className={`flex rounded overflow-hidden shadow bg-white ${
        isWatchlistMovie ? "flex-row" : "md:flex-col"
      }`}
    >
      <img
        className={`w-28 ${isWatchlistMovie ? "" : "md:w-full"}`}
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <div className="px-6 py-4 flex flex-col flex-1">
        <div className="flex-1">
          <h3
            className={`font-bold mb-2 text-lg text-gray-800 ${
              isWatchlistMovie ? "" : "md:text-xl"
            }`}
          >
            {movie.title}
          </h3>
          <div>
            {isWatchlistMovie ? null : (
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                {movie.vote_average.toFixed(1)}
              </span>
            )}
            <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
              {formattedDate}
            </span>
          </div>
        </div>

        <button
          className={`mt-4 text-sm md:text-base ${
            isInWatchlist ? "btn-remove" : "btn-add"
          }`}
          onClick={handleWatchlistAction}
          disabled={isPending}
        >
          {isPending ? (
            <div className="text-center inline-block">
              <LoadingIcon />
            </div>
          ) : (
            watchListLabel
          )}
        </button>
      </div>
    </div>
  );
}
