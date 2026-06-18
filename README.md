# Movie Search

A React app for searching movies and tracking your collection, built with Vite, TypeScript, Tailwind CSS, and the TMDB API.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher (use `nvm use` if you have [nvm](https://github.com/nvm-sh/nvm) installed — a `.nvmrc` is included)
- A free [TMDB account](https://www.themoviedb.org/signup) to obtain an API access token

## Setup

### 1. Clone the repository

```bash
git clone <repo-url>
cd movie-search
```

### 2. Install dependencies

```bash
npm install
```

### 3. Get a TMDB API token

1. Sign up or log in at [themoviedb.org](https://www.themoviedb.org)
2. Go to **Settings → API**
3. Copy your **API Read Access Token** (the long Bearer token — not the short API key)

### 4. Configure environment variables

**macOS / Linux:**
```bash
cp .env.example .env
```

**Windows:**
```bash
copy .env.example .env
```

Open `.env` and replace the placeholder with your token:

```
VITE_TMDB_TOKEN=your_tmdb_read_access_token_here
```

### 5. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── components/
│   └── MovieCard.tsx    # Reusable movie card component
├── pages/
│   ├── SearchPage.tsx   # Movie search UI
│   └── OwnedPage.tsx    # Owned movies collection page
├── App.tsx              # Root layout, router setup, and owned-movies state
├── types.ts             # Shared TypeScript types
├── index.css            # Global styles and Tailwind import
└── main.tsx             # App entry point
```

## Tech Stack

- **React 19** with TypeScript
- **Vite 8** — dev server and bundler
- **Tailwind CSS 4** — utility-first styling
- **React Router 7** — client-side routing
- **TMDB API** — movie data and posters
