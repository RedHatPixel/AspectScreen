import { JustWatchMovie } from '@/types/movie'
import MovieCard from './MovieCard'

type MoviesGridProps = {
  movies: JustWatchMovie[]
  emptyMessage?: string
}

const MoviesGrid = ({ movies, emptyMessage = 'No movies found.' }: MoviesGridProps) => {
  if (movies.length === 0) {
    return <p className="text-gray-500 text-sm">{emptyMessage}</p>
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <MovieCard key={`${movie.imdbId}-${movie.id}`} movie={movie} />
      ))}
    </div>
  )
}

export default MoviesGrid