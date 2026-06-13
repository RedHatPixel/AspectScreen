"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getTmdbImageUrl } from "@/lib/tmdb";
import { TmdbMovieDetails, TmdbMovieResult } from "@/types/tmdb";
import { images } from "@/constants/images";
import { sources } from "@/constants/sources";

type Props = {
    tmdbID: string;
    movie: TmdbMovieDetails;
    similarMovies: TmdbMovieResult[];
};

const WatchClient = ({ tmdbID, movie, similarMovies }: Props) => {
    const [activeSource, setActiveSource] = useState(0);

    const backdropUrl = movie.backdrop_path
        ? getTmdbImageUrl(movie.backdrop_path, "w1280")
        : null;
    const posterUrl = movie.poster_path
        ? getTmdbImageUrl(movie.poster_path, "w342")
        : null;

    const year = movie.release_date?.slice(0, 4);
    const runtime = movie.runtime
        ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
        : null;
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;

    return (
        <div className="mx-auto max-w-400 px-4 py-6 lg:px-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">

                <div className="flex flex-1 flex-col gap-5 min-w-0">

                    <div className="relative w-full overflow-hidden rounded-xl bg-black aspect-video shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
                        <iframe
                            key={activeSource}
                            src={sources[activeSource].getUrl(tmdbID)}
                            className="absolute inset-0 h-full w-full"
                            allowFullScreen
                            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                            referrerPolicy="origin"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium uppercase tracking-widest text-white/30 mr-1">
                            Source
                        </span>
                        {sources.map((s, i) => (
                            <button
                                key={s.label}
                                onClick={() => setActiveSource(i)}
                                className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${
                                    i === activeSource
                                        ? "bg-purple-600 text-white"
                                        : "bg-white/8 text-white/60 hover:bg-white/12 hover:text-white"
                                }`}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>

                    <div className="border-t border-white/5" />

                    <div className="flex gap-5">
                        {posterUrl && (
                            <div className="relative hidden h-36 w-24 shrink-0 overflow-hidden rounded-lg sm:block">
                                <Image
                                    src={posterUrl}
                                    alt={movie.title}
                                    fill
                                    sizes="96px"
                                    className="object-cover"
                                />
                            </div>
                        )}

                        <div className="flex flex-col gap-2 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                {year && (
                                    <span className="text-xs text-white/40">{year}</span>
                                )}
                                {runtime && (
                                    <>
                                        <span className="text-white/20">·</span>
                                        <span className="text-xs text-white/40">{runtime}</span>
                                    </>
                                )}
                                {rating && (
                                    <>
                                        <span className="text-white/20">·</span>
                                        <span className="flex items-center gap-1 text-xs text-amber-400">
                                            ★ {rating}
                                        </span>
                                    </>
                                )}
                            </div>

                            <h1 className="text-xl font-semibold leading-tight sm:text-2xl">
                                {movie.title}
                            </h1>

                            {movie.tagline && (
                                <p className="text-sm italic text-white/40">{movie.tagline}</p>
                            )}

                            <div className="flex flex-wrap gap-1.5 mt-1">
                                {movie.genres.map((g) => (
                                    <span
                                        key={g.id}
                                        className="rounded bg-white/8 px-2 py-0.5 text-xs text-white/60"
                                    >
                                        {g.name}
                                    </span>
                                ))}
                            </div>

                            {movie.overview && (
                                <p className="mt-1 text-sm leading-relaxed text-white/60 line-clamp-4">
                                    {movie.overview}
                                </p>
                            )}

                            <Link
                                href={`/details/${tmdbID}`}
                                className="mt-1 w-fit text-xs text-purple-400 hover:text-purple-300 transition-colors"
                            >
                                View full details →
                            </Link>
                        </div>
                    </div>
                </div>

                <aside className="flex flex-col gap-3 lg:w-80 xl:w-96 shrink-0">
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-white/30">
                        Up next
                    </h2>
                    <div className="flex flex-col gap-2">
                        {similarMovies.length === 0 && (
                            <p className="text-sm text-white/30">No suggestions found.</p>
                        )}
                        {similarMovies.map((m) => (
                            <Link
                                key={m.id}
                                href={`/watch/${m.id}`}
                                className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/5"
                            >
                                <div className="relative h-16 w-11 shrink-0 overflow-hidden rounded bg-zinc-800">
                                    <Image
                                        src={
                                            (m as any).posterUrl ||
                                            getTmdbImageUrl(m.poster_path) ||
                                            images.fallback
                                        }
                                        alt={m.title}
                                        fill
                                        sizes="44px"
                                        className="object-cover transition-transform group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="truncate text-sm font-medium group-hover:text-purple-300 transition-colors">
                                        {m.title}
                                    </span>
                                    <span className="text-xs text-white/40">
                                        {m.release_date?.slice(0, 4) ?? ""}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default WatchClient;