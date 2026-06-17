# Movie Search

A React app for searching movies and tracking your collection, built with Vite, TypeScript, Tailwind CSS, and the TMDB API.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A free [TMDB API](https://www.themoviedb.org/settings/api) account to get an access token

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

### 3. Configure environment variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Then open `.env` and add your TMDB **Read Access Token** (Bearer token — not the API key):

```
VITE_TMDB_TOKEN=your_tmdb_read_access_token_here
```

To find your token: log in to TMDB → Settings → API → **API Read Access Token**.

### 4. Start the development server

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
├── App.tsx          # Root layout, router setup, and owned-movies state
├── SearchPage.tsx   # Movie search UI
├── OwnedPage.tsx    # Owned movies collection page
├── MovieCard.tsx    # Movie card component
├── types.ts         # Shared TypeScript types
├── index.css        # Global styles and Tailwind import
└── main.tsx         # App entry point
```

## Tech Stack

- **React 19** with TypeScript
- **Vite 8** — dev server and bundler
- **Tailwind CSS 4** — utility-first styling
- **React Router 7** — client-side routing
- **TMDB API** — movie data and posters
