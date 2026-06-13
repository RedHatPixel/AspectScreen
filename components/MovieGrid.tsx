import MovieCard from '@/components/MovieCard';
import type { TmdbMovieResult } from '@/types/tmdb';

type MovieGridProps = {
    movies: TmdbMovieResult[];
};

const MovieGrid = ({ movies }: MovieGridProps) => {
    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
            {movies.map((m) => (
                <MovieCard key={m.id} movie={m} />
            ))}
        </div>
    );
};

export default MovieGrid;