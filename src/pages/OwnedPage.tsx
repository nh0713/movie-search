import { useOutletContext } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import type { OutletContext } from '../App';

export default function OwnedPage() {
  const { owned, toggleOwned } = useOutletContext<OutletContext>();
  const ownedList = Array.from(owned.values());

  if (ownedList.length === 0) {
    return <p className="text-gray-500 text-sm">No movies marked as owned yet.</p>;
  }

  return (
    <>
      <h2 className="text-lg font-semibold text-gray-700 mb-4">My Movies ({ownedList.length})</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {ownedList.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            owned={true}
            onToggle={toggleOwned}
          />
        ))}
      </div>
    </>
  );
}
