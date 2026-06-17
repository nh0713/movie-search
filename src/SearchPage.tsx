import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import MovieCard from './MovieCard';
import type { Movie, SearchResponse } from './types';
import type { OutletContext } from './App';

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

async function searchMovies(query: string, page: number): Promise<SearchResponse> {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );
  if (!res.ok) throw new Error('Failed to fetch movies');
  return res.json();
}

export default function SearchPage() {
  const { owned, toggleOwned } = useOutletContext<OutletContext>();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [totalResults, setTotalResults] = useState<number | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchResults(searchQuery: string, pageNum: number) {
    setLoading(true);
    setError(null);
    try {
      const data = await searchMovies(searchQuery, pageNum);
      setResults(data.results);
      setTotalResults(data.total_results);
      setTotalPages(data.total_pages);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query.trim()) return;
    setPage(1);
    fetchResults(query.trim(), 1);
  }

  async function handlePageChange(newPage: number) {
    setPage(newPage);
    fetchResults(query.trim(), newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <form onSubmit={handleSearch} className="flex gap-3 mb-10">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors cursor-pointer"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="text-red-500 text-sm mb-6">{error}</p>}

      {results.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Results</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {results.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                owned={owned.has(movie.id)}
                onToggle={toggleOwned}
              />
            ))}
          </div>
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-500">
              Page {page} of {totalPages} &mdash; {totalResults?.toLocaleString()} total results
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1 || loading}
                className="px-4 py-1.5 text-sm border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages || loading}
                className="px-4 py-1.5 text-sm border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
