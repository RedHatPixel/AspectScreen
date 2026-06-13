"use client"

import Image from "next/image";
import { images } from "@/constants/images";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getTmdbImageUrl, tmdb } from "@/lib/tmdb";
import { TmdbMovieResult } from "@/types/tmdb";

const MIN_QUERY_LENGTH = 2;

const SearchBar = ({ className }: { className?: string }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<TmdbMovieResult[]>([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (query.trim().length < MIN_QUERY_LENGTH) {
            setResults([]);
            setError(null);
            setLoading(false);
            return;
        }

        let cancelled = false;

        setLoading(true);
        setError(null);

        tmdb.searchMovies(query.trim(), 1, false)
            .then((tmdbList) => {
                if (!cancelled) {
                    setResults(tmdbList?.results.slice(0, 5) ?? []);
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (!cancelled) {
                    setError(err?.message ?? 'Something went wrong.');
                    setLoading(false);
                }
            });

        return () => { cancelled = true; };
    }, [query, searchParams]);

    const submitSearch = (searchTerm: string) => {
        const trimmed = searchTerm.trim();
        if (!trimmed) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set('search', trimmed);
        router.push(`/?${params.toString()}`);
        setOpen(false);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submitSearch(query);
    };

    const handleSelect = (movie: TmdbMovieResult) => {
        router.push(`/details/${movie.id}`);
        setOpen(false);
    };

    return (
        <div className={`relative ${className}`} tabIndex={-1}>
            <form
                onSubmit={handleSubmit}
                className="flex items-center gap-3 rounded-md bg-background/75 border border-white/10 px-4 py-2"
            >
                <input
                    value={query}
                    onFocus={() => setOpen(true)}
                    onBlur={() => setTimeout(() => setOpen(false), 120)}
                    onChange={(e) => setQuery(e.target.value)}
                    type="text"
                    placeholder="Search for movies, TV shows, and more..."
                    className="w-full bg-transparent text-sm text-white placeholder-white/75 focus:outline-none"
                    autoComplete="off"
                />
            </form>

            {open && (
                <div className="absolute left-0 right-0 z-50 mt-2 rounded-xl border border-white/10 bg-background/95 shadow-2xl shadow-black/40 backdrop-blur-xl">
                    <div>
                        {loading ? (
                            Array.from({ length: 5 }, (_, i) => (
                                <div key={i} className="flex items-center gap-3 px-4 py-3 animate-pulse">
                                    <div className="h-14 w-10 rounded bg-white/5" />
                                    <div className="min-w-0 flex-1 space-y-2">
                                        <div className="h-3 w-3/4 rounded bg-white/5" />
                                        <div className="h-2 w-1/2 rounded bg-white/5" />
                                    </div>
                                </div>
                            ))
                        ) : error ? (
                            <div className="px-4 py-3 text-sm text-rose-300">{error}</div>
                        ) : query.trim().length < MIN_QUERY_LENGTH ? (
                            <div className="px-4 py-3 text-sm text-white/60">
                                Type at least {MIN_QUERY_LENGTH} characters to search.
                            </div>
                        ) : results.length === 0 ? (
                            <div className="px-4 py-3 text-sm text-white/60">No movies found.</div>
                        ) : (
                            results.map((movie) => {
                                const poster = movie.poster_path
                                    ? getTmdbImageUrl(movie.poster_path, 'w154')
                                    : images.fallback;

                                return (
                                    <button
                                        key={movie.id}
                                        type="button"
                                        onMouseDown={() => handleSelect(movie)}
                                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-white hover:bg-white/5"
                                    >
                                        <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded bg-zinc-800">
                                            <Image
                                                src={poster}
                                                alt={movie.title}
                                                fill
                                                sizes="40px"
                                                className="object-cover"
                                                onError={(e) => {
                                                    (e.currentTarget as HTMLImageElement).src = images.fallback.src;
                                                }}
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="truncate font-medium">{movie.title}</div>
                                            <div className="text-xs text-white/50">
                                                {movie.release_date?.slice(0, 4) ?? 'N/A'}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;