import type { Movie } from './types';

interface Props {
  movie: Movie;
  owned: boolean;
  onToggle: (movie: Movie) => void;
}

export default function MovieCard({ movie, owned, onToggle }: Props) {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : 'N/A';

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : null;

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {posterUrl ? (
        <img src={posterUrl} alt={movie.title} className="w-full aspect-[2/3] object-cover" />
      ) : (
        <div className="w-full aspect-[2/3] bg-gray-100 flex items-center justify-center text-gray-400 text-xs">No poster</div>
      )}
      <div className="p-4 flex flex-col gap-2 flex-1 bg-gray-100">
        <h3 className="font-semibold text-gray-900 text-sm leading-snug">{movie.title}</h3>
        <p className="text-xs text-gray-500">{year}</p>
        <p className="text-xs text-gray-600 line-clamp-4 flex-1">{movie.overview || 'No overview available.'}</p>
      </div>
      <div className="px-4 pb-4 bg-gray-100">
        <button
          onClick={() => onToggle(movie)}
          className={`w-full text-xs font-medium py-1.5 px-3 rounded-lg border transition-colors cursor-pointer ${
            owned
              ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          {owned ? 'Owned ✓' : 'Mark as Owned'}
        </button>
      </div>
    </div>
  );
}
