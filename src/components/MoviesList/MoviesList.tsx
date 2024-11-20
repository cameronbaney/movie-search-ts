import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import MovieCard from "../MovieCard/MovieCard";
import Pagination from "../Pagination/Pagination";
import { API_URL, FETCH_OPTIONS, SEARCH_FILTERS } from "../../utils/constants";

import { type Api_Response } from "../../types/api";

interface Props {
  query: string;
  page: number;
  onPageChange: (newPage: number) => void;
}

const fetchMovies = async (url: string): Promise<Api_Response> => {
  const response = await fetch(url, FETCH_OPTIONS);
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
};

export default function MoviesList({ query, page, onPageChange }: Props) {
  const endpoint = query
    ? `${API_URL}/search/movie?page=${page}&query=${query}`
    : `${API_URL}/discover/movie?page=${page}&${SEARCH_FILTERS}`;

  const { data } = useSuspenseQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(endpoint),
  });

  if (!data.results.length) {
    return (
      <div className="align-middle text-center p-4 text-2xl">
        <p>No results found</p>
      </div>
    )
  }
  return (
    <Suspense fallback={<p>Loading</p>}>
      <Pagination
        currentPage={data.page}
        totalPages={data.total_pages}
        onPageChange={onPageChange}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-8 py-4">
        {data.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination
        currentPage={data.page}
        totalPages={data.total_pages}
        onPageChange={onPageChange}
      />
    </Suspense>
  );
}
