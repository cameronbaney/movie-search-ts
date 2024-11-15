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

  const watchListLabel = watchlist ? 'Remove from watchlist' : 'Add to watchlist';

  return (
    <div key={movie.id}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`Poster for ${movie.title}`}
      />
      <h2>{movie.title} - {watchlist}</h2>
      <p>{movie.vote_average}</p>
      <p>{formattedDate}</p>
      {addToWatchlist && (
        <button onClick={() => addToWatchlist(movie.id, watchlist ? false : true)}>{watchListLabel}</button>
      )}
    </div>
  );
}
