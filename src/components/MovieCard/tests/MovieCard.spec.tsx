import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieCard from '../MovieCard';
import * as watchlistHook from '../../../context/WatchlistContext';
import { movie, defaultMutation } from '../../../test/fixtures';
import { type WatchlistContextType } from '../../../context/WatchlistContext';

// Mock the entire context module
vi.mock('../../../context/WatchlistContext', () => ({
  useWatchlist: vi.fn()
}));

describe('MovieCard', () => {


  beforeEach(() => {
    vi.mocked(watchlistHook.useWatchlist).mockReturnValue({
      watchlist: [],
      addToWatchlistMutation: defaultMutation,
      getWatchlist: vi.fn(),
    } satisfies WatchlistContextType);
  });

  it('renders movie information correctly', () => {
    render(<MovieCard movie={movie} />);

    expect(screen.getByText(movie.title)).toBeInTheDocument();
    expect(screen.getByText('7.5')).toBeInTheDocument();
    expect(screen.getByText('Add to watchlist')).toBeInTheDocument();
  });

  it('shows movie as in watchlist when present', () => {
    vi.mocked(watchlistHook.useWatchlist).mockReturnValue({
      watchlist: [movie],
      addToWatchlistMutation: defaultMutation,
      getWatchlist: vi.fn(),
    } satisfies WatchlistContextType);

    render(<MovieCard movie={movie} />);
    expect(screen.getByText('Remove')).toBeInTheDocument();
  });

  it('displays loading state when adding to watchlist', async () => {
    const user = userEvent.setup();
    render(<MovieCard movie={movie} />);

    const addButton = screen.getByText('Add to watchlist');
    await user.click(addButton);

    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('loading-icon')).toBeInTheDocument();
  });

  it('renders placeholder image when poster_path is missing', () => {
    render(<MovieCard movie={{ ...movie, poster_path: '' }} />);

    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.src).toContain('placehold.co');
  });

  it('renders differently when isWatchlistMovie is true', () => {
    render(<MovieCard movie={movie} isWatchlistMovie={true} />);

    const container = screen.getByRole('img').parentElement;
    expect(container).toHaveClass('flex-row');
  });
});
