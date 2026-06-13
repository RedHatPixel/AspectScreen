import { tmdb, getTmdbImageUrl } from '@/lib/tmdb';
import MovieGrid from '@/components/MovieGrid';
import CategoryFilter from '@/components/CategoryFilter';
import Pagination from '@/components/Pagination';
import { categories, type MovieCategory } from '@/constants/categories';

type MovieListProps = {
    category: string;
    searchQuery?: string;
    currentPage: number;
};

const MovieList = async ({ category, searchQuery, currentPage }: MovieListProps) => {
    const selectedCategory = categories.find((c) => c.name === category) as MovieCategory;
    const safePage = Math.min(Math.max(1, currentPage), 500);

    const discover = searchQuery
        ? await tmdb.searchMovies(
              [searchQuery, selectedCategory.genreId ? '' : selectedCategory.fallbackQuery ?? '']
                  .filter(Boolean)
                  .join(' '),
              safePage,
              false,
          )
        : selectedCategory.genreId
          ? await tmdb.discoverMoviesByGenre(selectedCategory.genreId, {
                sort_by: 'popularity.desc',
                page: safePage,
            })
          : selectedCategory.name === 'All' || selectedCategory.name === 'Movies'
            ? await tmdb.discoverMovies({ sort_by: 'popularity.desc', page: safePage })
            : selectedCategory.fallbackQuery
              ? await tmdb.searchMovies(selectedCategory.fallbackQuery, safePage, false)
              : await tmdb.discoverMovies({ sort_by: 'popularity.desc', page: safePage });

    const movies = (discover?.results ?? []);
    const page = (discover?.page ?? 1);
    const totalPages = Math.min(discover?.total_pages ?? page, 500);
    const totalResults = discover?.total_results ?? 0;
    const displayPage = Math.min(safePage, totalPages);

    const buildUrl = (overrides: Record<string, string | null>) => {
        const params = new URLSearchParams();
        if (category !== 'All') params.set('categories', category);
        if (searchQuery) params.set('search', searchQuery);
        params.set('page', String(displayPage));
        for (const [k, v] of Object.entries(overrides)) {
            if (v === null) params.delete(k);
            else params.set(k, v);
        }
        const qs = params.toString();
        return qs ? `/?${qs}` : '/';
    };

    return (
        <div className="col-span-5">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h3 className="text-2xl font-semibold">
                        {searchQuery ? (
                            <>
                                Results for {" "}
                                <span className="text-purple-400">&ldquo;{searchQuery}&rdquo;</span>
                            </>
                        ) : (
                            category
                        )}
                    </h3>
                    <p className="text-white/50 text-sm">
                        {totalResults} result{totalResults !== 1 && 's'}
                    </p>
                </div>
                <CategoryFilter categories={categories} active={category} />
            </div>

            {movies.length > 0 ? (
                <MovieGrid movies={movies} />
            ) : (
                <div className="flex h-48 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/40">
                    No movies found.
                </div>
            )}

            <Pagination
                currentPage={displayPage}
                totalPages={totalPages}
                buildUrl={buildUrl}
            />
        </div>
    );
};

export default MovieList;