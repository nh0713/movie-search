export interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string | null;
}

export interface SearchResponse {
  results: Movie[];
  total_results: number;
  total_pages: number;
}
