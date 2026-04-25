import { JustWatchMovie } from '@/types/movie'
import MoviesGrid from './MoviesGrid'

type MovieSectionProps = {
  label: string
  movies: JustWatchMovie[]
}

const MovieSection = ({ label, movies }: MovieSectionProps) => (
  <section className="mb-10">
    <h2 className="text-lg font-semibold text-gray-200 mb-4">{label}</h2>
    <MoviesGrid movies={movies} emptyMessage="Nothing to show here yet." />
  </section>
)

export default MovieSection