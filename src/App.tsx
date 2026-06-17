import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Outlet } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import OwnedPage from './pages/OwnedPage';
import type { Movie } from './types';

export interface OutletContext {
  owned: Map<number, Movie>;
  toggleOwned: (movie: Movie) => void;
}

function Layout() {
  const [owned, setOwned] = useState<Map<number, Movie>>(new Map());

  function toggleOwned(movie: Movie) {
    setOwned((prev) => {
      const next = new Map(prev);
      if (next.has(movie.id)) {
        next.delete(movie.id);
      } else {
        next.set(movie.id, movie);
      }
      return next;
    });
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium pb-1 border-b-2 transition-colors ${
      isActive ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-900'
    }`;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-baseline justify-between mb-8">
          <h1 className="text-3xl font-bold text-black">Movie Search</h1>
          <nav className="flex gap-6">
            <NavLink to="/" end className={navLinkClass}>Search</NavLink>
            <NavLink to="/owned" className={navLinkClass}>
              My Movies {owned.size > 0 && `(${owned.size})`}
            </NavLink>
          </nav>
        </div>
        <Outlet context={{ owned, toggleOwned } satisfies OutletContext} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SearchPage />} />
          <Route path="owned" element={<OwnedPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
