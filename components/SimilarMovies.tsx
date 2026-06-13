import { tmdb, getTmdbImageUrl } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";

type Props = { movieId: string; genreIds: number[] };

const SimilarMovies = async ({ movieId, genreIds }: Props) => {
    const [similar, genreBased] = await Promise.all([
        tmdb.get<{ results: any[] }>(`movie/${movieId}/similar`, { page: 1 }),
        genreIds.length > 0
            ? tmdb.discoverMoviesByGenre(genreIds[0], { sort_by: "popularity.desc", page: 1 })
            : Promise.resolve(null),
    ]);

    const similarResults: any[] = similar?.results ?? [];

    const seen = new Set<number>();
    const merged: any[] = [];

    for (const m of [...similarResults, ...(genreBased?.results ?? [])]) {
        if (!seen.has(m.id) && m.id !== Number(movieId)) {
            seen.add(m.id);
            merged.push(m);
        }
        if (merged.length >= 20) break;
    }

    if (merged.length === 0) return null;

    const movies = merged;

    return (
        <section className="px-4 py-10 lg:px-12">
            <h2 className="mb-6 text-2xl font-semibold text-white">Movies you may like</h2>
            <MovieGrid movies={movies} />
        </section>
    );
};

export default SimilarMovies;