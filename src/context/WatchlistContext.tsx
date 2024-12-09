import { createContext, useContext, ReactNode } from "react";
import {
  useQueryClient,
  useMutation,
  UseMutationResult,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { type Movie } from "../types/movie";
import { API_URL, ACCOUNT_ID, FETCH_OPTIONS } from "../utils/constants";

interface WatchlistResponse {
  results: Movie[];
}

export interface WatchlistContextType {
  watchlist: Movie[];
  addToWatchlistMutation: UseMutationResult<
    { status_code: number; status_message: string },
    Error,
    { id: number; addToList?: boolean }
  >;
  getWatchlist: () => Promise<WatchlistResponse | undefined>;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined
);

interface WatchlistProviderProps {
  children: ReactNode;
}

export const WatchlistProvider = ({ children }: WatchlistProviderProps) => {
  const queryClient = useQueryClient();

  const addToWatchlistMutation = useMutation({
    mutationFn: async ({
      id,
      addToList = true,
    }: {
      id: number;
      addToList?: boolean;
    }) => {
      const body = {
        media_type: "movie",
        media_id: id,
        watchlist: addToList,
      };

      const response = await fetch(
        `${API_URL}/account/${ACCOUNT_ID}/watchlist`,
        {
          ...FETCH_OPTIONS,
          method: "POST",
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong.");
      }
      return await response.json();
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["watchlist"] }),
  });

  const getWatchlist = async () => {
    try {
      const response = await fetch(
        `${API_URL}/account/${ACCOUNT_ID}/watchlist/movies`,
        FETCH_OPTIONS
      );

      if (!response.ok) throw new Error("Failed to fetch");
      return response.json();
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  };

  const { data: watchlistResponse } = useSuspenseQuery({
    queryKey: ["watchlist"],
    queryFn: getWatchlist,
  });

  const watchlist = watchlistResponse?.results;

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlistMutation, getWatchlist }}
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
