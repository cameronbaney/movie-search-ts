import { vi } from 'vitest';
import { Movie } from "../types/movie";

export const movie: Movie = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/test.jpg',
  adult: false,
  backdrop_path: '/test-backdrop.jpg',
  genre_ids: [1, 2],
  original_language: 'en',
  original_title: 'Test Movie',
  overview: 'Test movie description',
  popularity: 1.0,
  release_date: '2024-03-20',
  video: false,
  vote_average: 7.5,
  vote_count: 100
}

const mockMutate = vi.fn();
export const defaultMutation = {
  mutate: mockMutate,
  isLoading: false,
  isError: false,
  isSuccess: false,
  isIdle: true,
  status: 'idle',
  data: undefined,
  error: null,
  reset: vi.fn(),
  mutateAsync: vi.fn(),
  variables: undefined,
  isPending: false,
  context: undefined,
  failureCount: 0,
  failureReason: null,
  isPaused: false,
  isLoadingError: false,
  submittedAt: 0
} as const;
