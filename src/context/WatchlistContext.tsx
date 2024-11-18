import { createContext, useContext, useState, ReactNode } from "react";
import { type Movie } from "../types/movie";
import { API_URL, ACCOUNT_ID, FETCH_OPTIONS } from "../utils/constants";

// Define the context type
interface WatchlistContextType {
  watchlist: Movie[];
  addToWatchlist: (id: number, addToList?: boolean) => Promise<void>;
  getWatchlist: () => Promise<void>;
}

// Initialize context with default values
const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined
);

interface WatchlistProviderProps {
  children: ReactNode;
}

export const WatchlistProvider = ({ children }: WatchlistProviderProps) => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  const addToWatchlist = async (id: number, addToList = true) => {
    try {
      const body = {
        media_type: "movie",
        media_id: id,
        watchlist: addToList,
      };
      await fetch(`${API_URL}/account/${ACCOUNT_ID}/watchlist`, {
        ...FETCH_OPTIONS,
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
        FETCH_OPTIONS
      )
        .then((res) => res.json())
        .catch((err) => console.error(err));

      setWatchlist(response.results || []);
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, getWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = (): WatchlistContextType => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
};
